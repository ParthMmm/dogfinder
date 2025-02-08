import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import { getDogsById, getDogSearch } from "~/lib/api/client";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

export function useGetDogsSearch() {
  const [selectedBreeds, setSelectedBreeds] = useQueryState(
    "breeds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const searchParams = {
    breeds: selectedBreeds,
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["dogs-search", searchParams],
    queryFn: () => getDogSearch(searchParams),
    staleTime: 20 * 1000,
    placeholderData: keepPreviousData,
  });

  const dogsQuery = useQuery({
    queryKey: ["dogs", data?.resultIds],
    queryFn: data?.resultIds
      ? () => getDogsById({ dogIds: data?.resultIds })
      : skipToken,
    enabled: !!data?.resultIds,
    placeholderData: keepPreviousData,
    staleTime: 20 * 1000,
  });

  return dogsQuery;
}
