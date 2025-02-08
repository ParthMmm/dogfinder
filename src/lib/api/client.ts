import { ofetch } from "ofetch";
import { z } from "zod";
import { type Dog } from "./types";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

// Create a configured ofetch instance
export const api = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export const loginSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .max(50, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email address"),
});

export async function login(data: z.infer<typeof loginSchema>) {
  return api<void>("/auth/login", {
    method: "POST",
    body: data,
  });
}

export async function logout() {
  return api<void>("/auth/logout", {
    method: "POST",
  });
}

export async function getDogBreeds() {
  return api<string[]>("/dogs/breeds", {
    method: "GET",
  });
}

export const dogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  zipCodes: z.array(z.number()).optional(),
  ageMin: z.number().optional().optional(),
  ageMax: z.number().optional().optional(),
  size: z.number().default(25).optional(),
  from: z.number().optional(),
  sort: z.string().optional(),
});

export type DogSearch = {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
};

export async function getDogSearch(data: z.infer<typeof dogSearchSchema>) {
  return api<DogSearch>("/dogs/search", {
    method: "GET",
    query: data,
  });
}

export async function getDogsById({ dogIds }: { dogIds: string[] }) {
  return api<Dog[]>("/dogs", {
    method: "POST",
    body: JSON.stringify(dogIds),
  });
}
