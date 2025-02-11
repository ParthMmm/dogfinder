import { z } from "zod";

export type Location = {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type User = {
  name: string;
  email: string;
};

export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export const locationSearchSchema = z.object({
  city: z.string().optional(),
  states: z.array(z.string()).optional(),
  geoBoundingBox: z.object({
    top: z.object({ lat: z.number(), lng: z.number() }).optional(),
  }),
  size: z.number().optional(),
  from: z.number().optional(),
});

export const sortSchema = z.enum([
  "breed:asc",
  "breed:desc",
  "name:asc",
  "name:desc",
  "age:asc",
  "age:desc",
]);

export const sortLiterals = [
  "breed:asc",
  "breed:desc",
  "name:asc",
  "name:desc",
  "age:asc",
  "age:desc",
] as const;

export type SortOption = z.infer<typeof sortSchema>;

export const dogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  zipCodes: z.array(z.string()).optional(),
  ageMin: z.number().optional(),
  ageMax: z.number().optional(),
  size: z.string().default("25").optional(),
  from: z.number().optional(),
  sort: sortSchema.optional(),
});

export type DogSearch = {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
};
