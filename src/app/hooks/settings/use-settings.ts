// app/hooks/settings/use-settings.ts
"use client";

import { usePathname, useRouter } from "next/navigation";

const paths = {
    userManagement: "/settings",
    //    userPreference: "/settings/user-preference",
    system: "/settings/system",
    //  auditLogs: "/settings/audit-logs"
};

const useSettings = () => {
    const router = useRouter();
    const pathName = usePathname();

    const handleButtonClick = (path: string) => {
        router.push(path);
    };

    return {
        paths,
        pathName,
        handleButtonClick,
    };
};

export default useSettings;