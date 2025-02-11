import { skipToken, useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getDogsById, getMatch } from "~/lib/api/client";
import { favoriteDogsAtom } from "~/store/app";
import { toast } from "sonner";
import { parseAsString, useQueryState } from "nuqs";

export function useDogMatch() {
  const [favoriteDogs, _] = useAtom(favoriteDogsAtom);
  const [matchResult, setMatchResult] = useQueryState(
    "matchResult",
    parseAsString.withDefault(""),
  );

  console.log(matchResult);

  const matchMutation = useMutation({
    mutationFn: getMatch,
    onSuccess: (data) => {
      void setMatchResult(data.match);
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
        success: "Match found!",
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
