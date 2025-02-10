import { atom } from "jotai";

export const isAuthenticatedAtom = atom<boolean>(false);
export const currentUserAtom = atom<{ name: string; email: string } | null>(
  null,
);
export const sliderUsedAtom = atom<boolean>(false);
export const ageSliderValuesAtom = atom<[number, number]>([0, 25]);
