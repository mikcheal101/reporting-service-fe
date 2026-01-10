// components/hooks/use-report-grid-card.ts
"use client";

import useDeleteReport from "@/app/hooks/report/use-delete-report";
import { useState } from "react";

const useReportGridCard = () => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const { mutate: deleteReport } = useDeleteReport();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleDeleteReport = async (id: string) => deleteReport(Number(id));

    return {
        isMenuOpen,

        toggleMenu,
        handleDeleteReport,
    };
};

export default useReportGridCard;