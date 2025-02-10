import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import { getDogsById, getDogSearch, sortLiterals } from "~/lib/api/client";
import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs";

export function useGetDogsSearch() {
  const [selectedBreeds] = useQueryState(
    "breeds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [minAge] = useQueryState(
    "minAge",
    parseAsInteger.withDefault(0).withOptions({ clearOnDefault: false }),
  );
  const [maxAge] = useQueryState(
    "maxAge",
    parseAsInteger.withDefault(20).withOptions({ clearOnDefault: true }),
  );
  const [sort] = useQueryState(
    "sort",
    parseAsStringLiteral(sortLiterals).withDefault("breed:asc"),
  );

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(25));

  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  //offset = pageSize * page-1
  const offset = Number(pageSize) * (page - 1);

  const searchParams = {
    breeds: selectedBreeds,
    ageMin: minAge,
    ageMax: maxAge,
    sort: sort,
    size: pageSize.toString(),
    from: offset,
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

  return { dogsQuery, total: data?.total ?? 0 };
}
