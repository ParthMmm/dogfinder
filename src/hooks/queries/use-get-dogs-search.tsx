import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import { getDogsById, getDogSearch, getLocations } from "~/lib/api/client";
import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs";
import { sortLiterals } from "~/lib/api/types";
import type { Location } from "~/lib/api/types";

export const locationSet = new Map<string, Location>();

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
  const [locationZipCodes] = useQueryState(
    "locations",
    parseAsArrayOf(parseAsString).withDefault([]),
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
    zipCodes: locationZipCodes,
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

  const zipCodes = dogsQuery.data?.map((dog) => dog.zip_code);

  const { data: locations } = useQuery({
    queryKey: ["locations", zipCodes],
    queryFn: zipCodes ? () => getLocations({ zipCodes: zipCodes }) : skipToken,
    enabled: !!zipCodes,
    placeholderData: keepPreviousData,
    staleTime: 20 * 1000,
  });

  //store locations in a map to remove duplicates
  //allows user to filter by saved locations and not just from locations query
  locations?.forEach((location) => {
    if (location?.zip_code) {
      locationSet.set(location.zip_code, location);
    }
  });

  return {
    dogsQuery,
    locations: Array.from(locationSet.values()),
    total: data?.total ?? 0,
  };
}
