"use client";

import React, { useState } from "react";
import useSettings from "@/app/hooks/settings/use-settings";

const Settings = () => {
  const { paths, pathName, handleButtonClick } = useSettings();

  return (
    <div>
      <div className="bg-white p-5 -mt-5 border-none space-x-6">
        <button
          className={`${
            paths.userManagement === pathName
              ? "bg-[#FFF7E8] font-bold text-[#FFBF48]"
              : "bg-white text-black"
          } rounded-xl p-2`}
          onClick={() => handleButtonClick(paths.userManagement)}
        >
          Users Management
        </button>
        <button
          className={`${
            paths.system === pathName
              ? "bg-[#FFF7E8] font-bold text-[#FFBF48]"
              : "bg-white text-black"
          } rounded-xl p-2`}
          onClick={() => handleButtonClick(paths.system)}
        >
          System
        </button>
        {/*  <button
            className={`${
                paths.auditLogs === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
            } rounded-xl p-2`}
            onClick={() => handleButtonClick("/settings/audit-logs")}
        >
            Audit logs
        </button> */}
      </div>
    </div>
  );
};
export default Settings;
