import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { logout } from "~/lib/api/client";
import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom, isAuthenticatedAtom } from "~/store/app";
import { toast } from "sonner";

export function UserButton() {
  const currentUser = useAtomValue(currentUserAtom);
  const setAuthenticated = useSetAtom(isAuthenticatedAtom);

  const logOutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      setAuthenticated(false);
    },
    onError: (error: Error) => {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn("aspect-square h-8 w-8 rounded-none")}>
          <AvatarFallback className="bg-orange-500/15 text-sm text-orange-500">
            {currentUser?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => logOutMutation.mutate()}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
