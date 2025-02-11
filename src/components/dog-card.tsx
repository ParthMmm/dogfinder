import { HeartIcon } from "lucide-react";
import { type Dog } from "~/lib/api/types";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useAtom } from "jotai";
import { favoriteDogsAtom } from "~/store/app";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";

export function DogCard({ dog }: { dog: Dog }) {
  const { locations } = useGetDogsSearch();

  const location = locations?.find(
    (location) => location?.zip_code === dog.zip_code,
  );

  return (
    <Card key={dog.id} className="w-full md:min-w-[200px]">
      <CardContent className="p-0">
        <Image
          src={dog.img}
          width={200}
          height={266}
          className="aspect-[3/4] w-full rounded-t-md bg-gray-200 object-cover sm:aspect-auto sm:h-72"
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
          <div>
            <FavoriteDogButton dog={dog} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FavoriteDogButton({ dog }: { dog: Dog }) {
  const [favoriteDogs, setFavoriteDogs] = useAtom(favoriteDogsAtom);

  const isFavorited = favoriteDogs.some((favDog) => favDog.id === dog.id);

  const handleFavorite = () => {
    if (isFavorited) {
      setFavoriteDogs(favoriteDogs.filter((x) => x.id !== dog.id));
    } else {
      setFavoriteDogs([...favoriteDogs, dog]);
    }
  };

  return (
    <Button
      variant="none"
      size="icon"
      className={cn("hover:text-red-500")}
      onClick={handleFavorite}
      title={isFavorited ? "Remove favorite" : "Favorite dog"}
    >
      <HeartIcon
        className={cn(
          "h-4 w-4",
          isFavorited
            ? "fill-red-500 text-red-500 transition-colors hover:fill-none"
            : "",
        )}
      />
    </Button>
  );
}
