import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { useQueryState, parseAsInteger } from "nuqs";
import { Button } from "~/components/ui/button";

import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";

import { useAtom } from "jotai";
import { ageSliderValuesAtom, sliderUsedAtom } from "~/store/app";
import { useState, useEffect } from "react";
import { useDebounce } from "~/hooks/use-debounce";
import { FilterIcon } from "lucide-react";

export function AgeSlider() {
  const [_, setSliderUsed] = useAtom(sliderUsedAtom);
  const [minAge, setMinAge] = useQueryState(
    "minAge",
    parseAsInteger.withDefault(0).withOptions({ clearOnDefault: true }),
  );
  const [maxAge, setMaxAge] = useQueryState(
    "maxAge",
    parseAsInteger.withDefault(20).withOptions({ clearOnDefault: true }),
  );

  const [localValues, setLocalValues] = useAtom(ageSliderValuesAtom);
  const debouncedValues = useDebounce({ value: localValues, delay: 300 });

  useEffect(() => {
    void setMinAge(debouncedValues[0] ?? 0);
    void setMaxAge(debouncedValues[1] ?? 20);
  }, [debouncedValues, setMinAge, setMaxAge]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <span className="flex items-center justify-start align-middle">
              <FilterIcon className="mr-2 h-4 w-4" />
              {"Age"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-6" align="start">
          <Slider
            min={0}
            max={20}
            step={1}
            value={localValues}
            onValueChange={(value) => {
              setLocalValues([value[0] ?? minAge, value[1] ?? maxAge]);
              setSliderUsed(true);
            }}
            className="my-6"
          />

          <div className="flex flex-row justify-between">
            <Label>0</Label>

            <Label>20</Label>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex flex-row justify-between"></div>
    </>
  );
}
