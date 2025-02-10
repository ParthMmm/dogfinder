import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { favoriteDogsAtom } from "~/store/app";
import Image from "next/image";
import { FavoriteDogButton } from "./dog-card";

export function FavoriteSidebar() {
  const [favoriteDogs, setFavoriteDogs] = useAtom(favoriteDogsAtom);

  if (favoriteDogs.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Favorite Dogs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {favoriteDogs.map((dog) => {
          return (
            <div className="flex w-full flex-col gap-1" key={dog.id}>
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
                <FavoriteDogButton dog={dog} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
