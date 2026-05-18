// components/connection/connection-toolbar
"use client";

import { useState } from "react";
import ConnectionFormSheetProps from "@/types/components/connection/connection-form-sheet";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon, Plus, Save, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import IDataBaseType from "@/types/connection/idatabase-type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const ConnectionFormSheet = (properties: ConnectionFormSheetProps) => {
  const [isPending, setIsPending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  const confirmSave = async () => {
    setIsPending(true);
    try {
      await properties.handleSubmit();
      setShowConfirm(false);
      properties.setIsOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
    <Sheet open={properties.isOpen} onOpenChange={(open) => properties.setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            properties.resetFields();
            properties.setConnection(null);
            properties.setConnectionId("");
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Connection
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[560px]">
        <SheetHeader>
          <SheetTitle>
            {properties.connectionId ? "Edit Connection" : "Add New Connection"}
          </SheetTitle>
          <SheetDescription>
            {properties.connection
              ? "Make changes to your connection details here. Click save when you're done."
              : "Enter details for the new connection."}
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Connection name"
              className="col-span-1"
              type="text"
              value={properties.formData.name}
              onChange={properties.handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="server" className="text-right">
              Server Address:
            </Label>
            <Input
              id="server"
              name="server"
              placeholder="Server Address"
              className="col-span-1"
              value={properties.formData.server}
              onChange={properties.handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="port" className="text-right">
              Port:
            </Label>
            <Input
              id="port"
              name="port"
              placeholder="Port"
              className="col-span-1"
              type="number"
              value={properties.formData.port}
              onChange={properties.handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="user" className="text-right">
              Username:
            </Label>
            <Input
              id="user"
              name="user"
              placeholder="Username"
              className="col-span-1"
              value={properties.formData.user}
              onChange={properties.handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-right">
              Password:
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                placeholder="Password"
                className="pr-10"
                type={properties.showPassword ? "text" : "password"}
                value={properties.formData.password}
                onChange={properties.handleInputChange}
              />
              <button
                type="button"
                onClick={() => properties.setShowPassword(!properties.showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                {properties.showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="database" className="text-right">
              Database Name:
            </Label>
            <Input
              id="database"
              name="database"
              placeholder="Database Name"
              className="col-span-1"
              value={properties.formData.database}
              onChange={properties.handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="databaseType" className="text-right">
              Database Type:
            </Label>
            <Select
              value={String(properties.formData.databaseType)}
              onValueChange={(value) =>
                properties.setFormData((prev) => ({
                  ...prev,
                  databaseType: Number(value) as IDataBaseType,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Database" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(IDataBaseType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => (
                    <SelectItem key={value} value={String(value)}>
                      {key}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={properties.handleTestConnection}>
              Test Connection
            </Button>
            <Button type="submit" onClick={handleSaveClick} disabled={!properties.formData.isTestSuccessful || isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {properties.formData.id ? "Update" : "Save"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm {properties.formData.id ? "Update" : "Save"}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {properties.formData.id ? "update" : "save"} this connection? Please verify all fields are correct.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmSave} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {properties.formData.id ? "Update" : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default ConnectionFormSheet;
