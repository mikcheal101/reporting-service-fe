// types/components/connection/connection-toolbar
"use client";

type ConnectionToolBarProps = {
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<'list' | 'grid'>>;
};

export default ConnectionToolBarProps;