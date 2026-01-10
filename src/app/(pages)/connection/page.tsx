// app/connection-table/page.tsx

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ConnectionLayout from "./connection-layout";
import Connection from "./connection";

const ConnectionPage: React.FC = () => {
  return (
    <ConnectionLayout>
      <Connection />
      <Toaster />
    </ConnectionLayout>
  );
};

export default ConnectionPage;
