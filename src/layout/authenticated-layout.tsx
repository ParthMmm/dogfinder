import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { currentUserAtom, isAuthenticatedAtom } from "~/store/app";
import { Nav } from "~/layout/nav";
import { MatchModal } from "~/components/match-modal";
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
      <MatchModal />
      <main className="flex h-[calc(100vh-64px)] overflow-hidden pb-12 pt-0 md:pt-4">
        {children}
      </main>
    </div>
  );
}
