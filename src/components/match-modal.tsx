import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useDogMatch } from "~/hooks/queries/use-dog-match";
import { useEffect } from "react";
import { parseAsString } from "nuqs";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";
import { useAtom } from "jotai";
import { matchModalOpenAtom } from "~/store/app";

export function MatchModal() {
  const [matchResult, setMatchResult] = useQueryState(
    "matchResult",
    parseAsString.withDefault(""),
  );
  const [isOpen, setIsOpen] = useAtom(matchModalOpenAtom);

  const { matchQuery } = useDogMatch();
  const dog = matchQuery.data?.[0];
  const { locations } = useGetDogsSearch();

  const location = locations?.find(
    (location) => location?.zip_code === dog?.zip_code,
  );

  if (!dog) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Found your match!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="sr-only">{"Your dog match has been found!"}</div>
        </DialogDescription>
        <Image
          src={dog.img}
          width={200}
          height={266}
          className="aspect-[3/4] w-full rounded-xl bg-gray-200 object-cover sm:aspect-auto sm:h-72"
          alt={`Photo of ${dog.name}, a ${dog.breed}`}
        />

        <div className="flex flex-row justify-between p-4">
          <div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xl font-medium leading-4">{dog.name}</h2>
              <p className="text-lg text-neutral-700 dark:text-neutral-400">
                {dog.breed}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 pt-2">
              {dog.age === 0 ? (
                <span className="text-sm">Puppy</span>
              ) : (
                <span className="text-sm">{dog.age} years old</span>
              )}
            </div>
            {location ? (
              <span className="text-sm tabular-nums">
                {location?.city}, {location?.state}
              </span>
            ) : (
              <span className="text-sm tabular-nums">{dog.zip_code}</span>
            )}
          </div>{" "}
        </div>
      </DialogContent>
    </Dialog>
  );
}
