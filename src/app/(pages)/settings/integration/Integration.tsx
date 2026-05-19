"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Puzzle,
  Key,
  Webhook,
  Link,
  Plus,
  Copy,
  Check,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  label: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
}

const MOCK_KEYS: ApiKey[] = [
  {
    id: "1",
    label: "Production API Key",
    key: "ak_prod_••••••••••••a3f8",
    createdAt: "2026-01-15",
    lastUsed: "2026-05-18",
  },
  {
    id: "2",
    label: "Staging API Key",
    key: "ak_stag_••••••••••••b2c1",
    createdAt: "2026-03-01",
    lastUsed: "2026-05-17",
  },
];

const Integration = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(MOCK_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
      variant: "success",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevoke = (id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
    toast({
      title: "Revoked",
      description: "API key has been revoked",
      variant: "success",
    });
  };

  return (
    <FadeIn delay={100} direction="up">
      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* API Keys Section */}
          <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    API Keys
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage API keys for programmatic access
                  </p>
                </div>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="w-3.5 h-3.5" />
                Generate Key
              </Button>
            </div>

            {apiKeys.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center rounded-lg border border-dashed border-border">
                <Key className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    No API keys
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Generate your first API key to get started
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {apiKey.label}
                        </span>
                        <Badge variant="outline" className="text-xs font-mono">
                          {apiKey.key}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {apiKey.createdAt}
                        {apiKey.lastUsed && ` · Last used ${apiKey.lastUsed}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(apiKey.key, apiKey.id)}
                      >
                        {copiedId === apiKey.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleRevoke(apiKey.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Webhooks Section */}
          <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Webhook className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Webhooks
                </h2>
                <p className="text-sm text-muted-foreground">
                  Receive real-time event notifications
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 py-12 text-center rounded-lg border border-dashed border-border">
              <Webhook className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  No webhooks configured
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Set up webhooks to receive events for report completion,
                  failures, and more
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-1 mt-2">
                <Plus className="w-3.5 h-3.5" />
                Add Webhook
              </Button>
            </div>
          </div>

          {/* Third-Party Integrations Section */}
          <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Third-Party Integrations
                </h2>
                <p className="text-sm text-muted-foreground">
                  Connect with external services
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "Slack",
                  desc: "Send report notifications to Slack channels",
                  connected: false,
                },
                {
                  name: "Email (SMTP)",
                  desc: "Send reports via email",
                  connected: true,
                },
                {
                  name: "WebDAV",
                  desc: "Export reports to WebDAV-compatible servers",
                  connected: false,
                },
              ].map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Puzzle className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {integration.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {integration.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.connected && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                        Connected
                      </Badge>
                    )}
                    <Button variant="outline" size="sm" className="gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {integration.connected ? "Configure" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default Integration;
