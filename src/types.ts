import type { Doctor } from "@prisma/client";

export const allowed = ['uk', 'en', 'pl'];

export interface Specialization {
  specName: string;
  drs: Doctor[];
}

export type Lang = 'uk' | 'en' | 'pl';