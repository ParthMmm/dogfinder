import { useQuery } from "@tanstack/react-query";
import { getDogBreeds } from "~/lib/api/client";

export function useGetDogBreeds() {
  return useQuery({
    queryKey: ["dog-breeds"],
    queryFn: () => getDogBreeds(),
    staleTime: 20 * 1000,
  });
}
