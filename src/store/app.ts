import { atom } from "jotai";
import { type Dog } from "~/lib/api/types";

export const isAuthenticatedAtom = atom<boolean>(false);
export const currentUserAtom = atom<{ name: string; email: string } | null>(
  null,
);
export const sliderUsedAtom = atom<boolean>(false);
export const ageSliderValuesAtom = atom<[number, number]>([0, 20]);

export const favoriteDogsAtom = atom<Dog[]>([]);
export const matchModalOpenAtom = atom<boolean>(false);
