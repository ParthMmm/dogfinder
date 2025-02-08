import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDogSearch } from "~/lib/api/client";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
export function useGetDogsSearch() {
  const [selectedBreeds, setSelectedBreeds] = useQueryState(
    "breeds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const data = {
    breeds: selectedBreeds,
  };

  return useQuery({
    queryKey: ["dogs-search", data],
    queryFn: () => getDogSearch(data),
    staleTime: 20 * 1000,
    placeholderData: keepPreviousData,
  });
}
