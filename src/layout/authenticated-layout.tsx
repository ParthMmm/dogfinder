import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { currentUserAtom, isAuthenticatedAtom } from "~/store/app";
import { Nav } from "~/layout/nav";

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentUser = useAtomValue(currentUserAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  useEffect(() => {
    if (!currentUser || !isAuthenticated) {
      void router.push("/");
    }
  }, [currentUser, isAuthenticated, router]);

  if (!currentUser || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 overflow-hidden py-4">{children}</main>
    </div>
  );
}
