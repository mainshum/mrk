import type { Doctor } from "@prisma/client";

export interface Specialization {
  specName: string;
  drs: Doctor[];
}