// types/report/ijoin.ts
"use client";

export default interface IJoin {
  tableName: string;
  alias: string;
  joinType: "INNER" | "LEFT" | "RIGHT" | "FULL";
  onCondition: string;
};
