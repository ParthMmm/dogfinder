import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { useAtom, useAtomValue } from "jotai";
import { favoriteDogsAtom, favoriteDrawerOpenAtom } from "~/store/app";
import {
  DogMatchButton,
  FavoriteDog,
} from "~/components/sidebar/favorite-sidebar";
export function FavoriteDrawer() {
  const [isOpen, setIsOpen] = useAtom(favoriteDrawerOpenAtom);
  const favoriteDogs = useAtomValue(favoriteDogsAtom);

  if (favoriteDogs.length === 0) {
    return null;
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
          <DrawerTitle>Favorite Dogs</DrawerTitle>
          <DrawerDescription>
            <span className="sr-only">Favorite Dogs</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="flex w-full flex-col items-start justify-center gap-2 p-2 px-4">
            {favoriteDogs.map((dog) => (
              <FavoriteDog key={dog.id} dog={dog} />
            ))}
            <div className="flex w-full pb-8 pt-4">
              <DogMatchButton />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
