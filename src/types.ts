import type { Doctor } from "@prisma/client";

export const allowed = ['pl', 'en', 'ua', 'fr'];

export interface Specialization {
  specName: string;
  drs: Doctor[];
}

export type Lang = 'ua' | 'en' | 'pl' | 'fr';