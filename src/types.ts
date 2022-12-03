import type { Doctor } from "@prisma/client";

export const allowed = ['pl', 'en', 'uk'];

export interface Specialization {
  specName: string;
  drs: Doctor[];
}

export type Lang = 'uk' | 'en' | 'pl';