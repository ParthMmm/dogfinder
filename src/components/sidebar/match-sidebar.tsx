import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import { FavoriteDogButton } from "../dog-card";
import { useDogMatch } from "~/hooks/queries/use-dog-match";
import { parseAsString } from "nuqs";
import { useQueryState } from "nuqs";
import { useSetAtom } from "jotai";
import { matchModalOpenAtom } from "~/store/app";
export function MatchSidebar() {
  const { matchQuery } = useDogMatch();
  const dog = matchQuery.data?.[0];
  const setModalOpen = useSetAtom(matchModalOpenAtom);
  const [matchResult, setMatchResult] = useQueryState(
    "matchResult",
    parseAsString.withDefault(""),
  );

  if (!dog || !matchResult) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Match</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {dog ? (
          <button
            className="flex w-full flex-col gap-1 rounded-sm p-2 transition-colors hover:bg-stone-200 dark:hover:bg-stone-800"
            key={dog.id}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <div className="flex flex-row items-center justify-between gap-0.5 align-middle">
              <div className="flex flex-shrink-0 flex-row items-center justify-start gap-2 align-middle">
                <div className="h-[40px] w-[40px] max-w-[40px] flex-shrink-0">
                  <Image
                    src={dog.img}
                    width={40}
                    height={40}
                    alt={"dog"}
                    className="aspect-square rounded-sm object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-col">
                    <span className="leading-0 truncate text-left">
                      {dog.name}
                    </span>

                    <div className="flex flex-row gap-1 overflow-hidden">
                      <span className="text-sm text-neutral-700 dark:text-neutral-400">
                        {dog.breed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ) : null}
      </CardContent>
    </Card>
  );
}
