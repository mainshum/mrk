import { Doctor, Spec, PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import type { Specialization } from "../../../types";

function isNumber(x: any): x is number {
  return Number.isInteger(x);
}

const reduceSpec = (drs: Doctor[]) => (acc: Specialization[], cv: Spec) => 
  acc.concat({specName: cv.name, drs: drs.filter(d => d.spec_id === cv.id)});

export const get: APIRoute = async ({params, request})  =>{
  const prisma = new PrismaClient();
  const {city_id} = params;

  if (!city_id) 
    return {body: JSON.stringify([])};

  const parsed = isNumber(city_id)
    ? city_id
    : Number.parseInt(city_id);

  const specsPr = prisma.spec.findMany({})

  const drsPr = prisma.doctor.findMany({
    where: {city_id: parsed}
  });

  const [specs, drs] = await Promise.all([specsPr, drsPr]);

  const withDoctors = reduceSpec(drs);

  const nonEmptySpecs = (s: Specialization) => s.drs.length > 0;

  const retval: Specialization[] = specs
    .reduce(withDoctors, [])
    .filter(nonEmptySpecs)

  return {
    body: JSON.stringify(retval)
  }
}