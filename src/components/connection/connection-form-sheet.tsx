// components/connection/connection-toolbar
"use client";

import ConnectionFormSheetProps from "@/types/components/connection/connection-form-sheet";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import renderDatabaseTypeDropdown from "../ui/database-dropdown";

const ConnectionFormSheet = (properties: ConnectionFormSheetProps) => {
  return (
    <Sheet open={properties.isOpen} onOpenChange={(open) => properties.setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center px-5 py-5 bg-[#EAB308] text-white text-sm font-medium rounded hover:bg-amber-400 transition"
          onClick={() => {
            properties.resetFields();
            properties.setConnection(null);
            properties.setConnectionId("");
          }}
        >
          <FaPlus className="mr-2" />
          Add Connection
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[40%]">
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

          <div className="flex flex-col gap-2 ">
            <Label htmlFor="password" className="text-right">
              Password:
            </Label>
            <div className="flex items-center">
              <Input
                id="password"
                name="password"
                placeholder="Password"
                className="flex-1"
                type={properties.showPassword ? "text" : "password"}
                value={properties.formData.password}
                onChange={properties.handleInputChange}
              />
              <button
                type="button"
                onClick={() => properties.setShowPassword(!properties.showPassword)}
                className="-ml-8 text-gray-500"
              >
                {properties.showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
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
            {renderDatabaseTypeDropdown(properties.formData, properties.setFormData)}
          </div>
        </div>
        <SheetFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={properties.handleTestConnection}>
              Test Connection
            </Button>
            <SheetClose asChild>
              <Button type="submit" onClick={properties.handleSubmit} disabled={!properties.formData.isTestSuccessful}>
                {properties.formData.id ? "Update" : "Save"}
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ConnectionFormSheet;
