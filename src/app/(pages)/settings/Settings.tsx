
"use client";

import React, {useState} from "react";

import {useRouter} from "next/navigation";
import { usePathname } from 'next/navigation'



const Settings = ()=>{
    const router = useRouter();

    const paths = {
        userManagement: "/settings",
    //    userPreference: "/settings/user-preference",
        system: "/settings/system",
     //   security: "/settings/security",
      //  notification: "/settings/notification",
      //  integrations: "/settings/integration",
      //  auditLogs: "/settings/audit-logs"
    }
    const pathName = usePathname()

    const handleButtonClick = (path: string) => {
        router.push(path);
    };

    return(
        <div>
            <div className="bg-white p-5 -mt-5 border-none space-x-6">
            <button
                    className={`${
                        paths.userManagement === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("/settings")}
                >
                    Users Management
                </button>
                {/* <button
                    className={`${
                        paths.userPreference === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("/settings/user-preference")}
                >
                    User preference
                </button> */}
                <button
                    className={`${
                        paths.system === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}  
                    onClick={() => handleButtonClick("/settings/system")}
                >
                    System
                </button>
                {/* <button
                    className={`${
                        paths.security === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("/settings/security")}
                >
                    Security
                </button> */}
                {/* <button
                    className={`${
                        paths.notification === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("/settings/notification")}
                >
                    Notification
                </button>
                <button
                    className={`${
                        paths.integrations === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick( "/settings/integration")}
                >
                    Integration
                </button>
                <button
                    className={`${
                        paths.auditLogs === (pathName) ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("/settings/audit-logs")}
                >
                    Audit logs
                </button> */}
            </div>
        </div>
       
    )
}
export default Settings;
