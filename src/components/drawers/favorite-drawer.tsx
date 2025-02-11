import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { useAtom } from "jotai";
import { favoriteDogsAtom, favoriteDrawerOpenAtom } from "~/store/app";
import {
  DogMatchButton,
  FavoriteDog,
} from "~/components/sidebar/favorite-sidebar";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
export function FavoriteDrawer() {
  const [isOpen, setIsOpen] = useAtom(favoriteDrawerOpenAtom);
  const [favoriteDogs, setFavoriteDogs] = useAtom(favoriteDogsAtom);

  if (favoriteDogs.length === 0) {
    return (
      <Drawer
        modal={false}
        dismissible={true}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DrawerContent className="h-1/2">
          <DrawerHeader>
            <DrawerTitle>Favorite Dogs</DrawerTitle>
            <DrawerDescription>
              <span className="sr-only">Favorite Dogs</span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="flex w-full flex-col items-center justify-center gap-2 p-2 px-4">
              <span>Add your favorite dogs to find your match</span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer
      modal={false}
      dismissible={true}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerContent className="h-1/2">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex flex-row items-center justify-between gap-2">
              Favorite Dogs
              <DrawerClose asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-stone-500 dark:text-stone-400"
                  onClick={() => setFavoriteDogs([])}
                >
                  Clear <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerTitle>
          <DrawerDescription>
            <span className="sr-only">Favorite Dogs</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="flex w-full flex-col items-start justify-center gap-2 p-2 px-4">
            {favoriteDogs.map((dog) => (
              <FavoriteDog key={dog.id} dog={dog} />
            ))}

            {favoriteDogs.length > 0 ? (
              <div className="flex w-full pb-8 pt-4">
                <DogMatchButton />
              </div>
            ) : null}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
