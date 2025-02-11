import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useAtom } from "jotai";
import { favoriteDrawerOpenAtom } from "~/store/app";
export function FavoriteDrawer() {
  const [isOpen, setIsOpen] = useAtom(favoriteDrawerOpenAtom);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Favorites</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
