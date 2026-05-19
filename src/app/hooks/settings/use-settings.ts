// app/hooks/settings/use-settings.ts
"use client";

import { usePathname, useRouter } from "next/navigation";
import { FE_ROUTES } from "../../constants/routes.constant";

const paths = {
    userManagement: FE_ROUTES.SETTINGS,
    userPreference: FE_ROUTES.SETTINGS_USER_PREFERENCE,
    system: FE_ROUTES.SETTINGS_SYSTEM,
    security: FE_ROUTES.SETTINGS_SECURITY,
    notification: FE_ROUTES.SETTINGS_NOTIFICATION,
    integration: FE_ROUTES.SETTINGS_INTEGRATION,
    auditLogs: "/settings/audit-logs",
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