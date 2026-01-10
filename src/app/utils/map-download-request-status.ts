// app/utils/map-download-request-status.ts
"use client";

import { RequestStatus } from "../enums/RequestStatus";

const mapDownloadRequestStatus = (status: number): string => {
    switch (status) {
        case RequestStatus.New:
            return "New";
        case RequestStatus.InProgress:
            return "InProgress";
        case RequestStatus.Completed:
            return "Done";
        case RequestStatus.Downloaded:
            return "Downloaded";
        default:
            return "Unknown";
    }
};

export default mapDownloadRequestStatus;