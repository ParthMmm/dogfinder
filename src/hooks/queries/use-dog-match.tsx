import { skipToken, useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { getDogsById, getMatch } from "~/lib/api/client";
import { favoriteDogsAtom, matchModalOpenAtom } from "~/store/app";
import { toast } from "sonner";
import { parseAsString, useQueryState } from "nuqs";

export function useDogMatch() {
  const favoriteDogs = useAtomValue(favoriteDogsAtom);
  const [matchResult, setMatchResult] = useQueryState(
    "matchResult",
    parseAsString.withDefault(""),
  );
  const setIsOpen = useSetAtom(matchModalOpenAtom);

  const matchMutation = useMutation({
    mutationFn: getMatch,
    onSuccess: (data) => {
      void setMatchResult(data.match);
      void setIsOpen(true);
    },
    onError: (error) => {
      console.error(error);
    },
    onMutate: () => {
      void setMatchResult("");
    },
  });

  const findMatch = async () => {
    toast.promise(
      matchMutation.mutateAsync({
        dogIds: favoriteDogs.map((dog) => dog.id),
      }),
      {
        loading: "Finding your match...",
        error: "Error finding match",
      },
    );
  };
  const matchQuery = useQuery({
    queryKey: ["dog-match", matchResult],
    queryFn:
      matchResult.length > 0
        ? () => getDogsById({ dogIds: [matchResult] })
        : skipToken,
    enabled: !!matchResult,
    staleTime: 20 * 1000,
  });

  return {
    findMatch,
    matchQuery,
    matchMutation,
  };
}
