import { ofetch } from "ofetch";
import { z } from "zod";
import type {
  Dog,
  Location,
  locationSearchSchema,
  dogSearchSchema,
  DogSearch,
} from "./types";

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

export async function getLocations({ zipCodes }: { zipCodes: string[] }) {
  return api<Location[]>("/locations", {
    method: "POST",
    body: JSON.stringify(zipCodes),
  });
}

export async function getLocationByZipCode(
  data: z.infer<typeof locationSearchSchema>,
) {
  return api<{
    results: Location[];
    total: number;
  }>("/locations/search", {
    method: "POST",
    body: data,
  });
}

export async function getMatch({ dogIds }: { dogIds: string[] }) {
  return api<{ match: string }>("/dogs/match", {
    method: "POST",
    body: JSON.stringify(dogIds),
  });
}
