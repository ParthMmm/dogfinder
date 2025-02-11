import Link from "next/link";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { UserButton } from "~/components/user-button";

export function Nav() {
  return (
    <div className="mx-auto h-16 w-full items-center gap-4 px-4 py-2 md:w-3/4">
      <nav className="flex w-full flex-row justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-xl font-black leading-6 tracking-tighter">
              DogFinder
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4">
          <UserButton />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
