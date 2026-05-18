// app/hooks/settings/use-settings.ts
"use client";

import { usePathname, useRouter } from "next/navigation";
import { FE_ROUTES } from "../../constants/routes.constant";

const paths = {
    userManagement: FE_ROUTES.SETTINGS,
    //    userPreference: "/settings/user-preference",
    system: FE_ROUTES.SETTINGS_SYSTEM,
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