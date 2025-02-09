import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { useQueryState, parseAsInteger } from "nuqs";
import { Button } from "~/components/ui/button";

import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
//

export function AgeSlider() {
  const [sliderUsed, setSliderUsed] = useState(false);
  const [minAge, setMinAge] = useQueryState(
    "minAge",
    parseAsInteger.withDefault(0).withOptions({ clearOnDefault: false }),
  );
  const [maxAge, setMaxAge] = useQueryState(
    "maxAge",
    parseAsInteger.withDefault(25).withOptions({ clearOnDefault: true }),
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <div className="flex items-center justify-start align-middle">
              {"Age"}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-6" align="start">
          <Slider
            min={0}
            max={25}
            step={1}
            value={[minAge, maxAge]}
            onValueChange={(value) => {
              void setMinAge(value[0] ?? minAge);
              void setMaxAge(value[1] ?? maxAge);
              setSliderUsed(true);
            }}
            className="my-6"
          />

          <div className="flex flex-row justify-between">
            <Label>0</Label>

            <Label>25</Label>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex flex-row justify-between">
        {/* if slider was used, show the badge, fixes bug when minAge is 0 whichi is false but a valid value */}
        {sliderUsed ? (
          <Badge
            className="gap-1 border-orange-600/20 bg-orange-50 text-orange-800 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-500"
            variant={"none"}
          >
            Ages {minAge} - {maxAge}
            <button
              onClick={() => {
                void setMinAge(null);
                void setMaxAge(null);
                setSliderUsed(false);
              }}
              className="rounded-sm text-stone-400 transition-colors hover:text-stone-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-500 focus-visible:ring-0 dark:text-stone-700"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ) : null}
      </div>
    </>
  );
}
