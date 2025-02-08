import { atom } from "jotai";

export const isAuthenticatedAtom = atom<boolean>(false);
export const currentUserAtom = atom<{ name: string; email: string } | null>(
  null,
);
