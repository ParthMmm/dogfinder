import { AgeSlider } from "~/components/age-slider";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useAtom, useSetAtom } from "jotai";
import { ageSliderValuesAtom, sliderUsedAtom } from "~/store/app";
import { FilterBadge, FilterBadgeXButton } from "~/components/filter-badge";
import { SortSelect } from "~/components/sort-select";
import { BreedPicker } from "~/components/breed-picker";
import { Button } from "~/components/ui/button";
import { XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function FilterSidebar() {
  const setAgeSliderValues = useSetAtom(ageSliderValuesAtom);
  const [selectedBreeds, setSelectedBreeds] = useQueryState(
    "breeds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [sliderUsed, setSliderUsed] = useAtom(sliderUsedAtom);
  const [minAge, setMinAge] = useQueryState(
    "minAge",
    parseAsInteger.withDefault(0).withOptions({ clearOnDefault: true }),
  );
  const [maxAge, setMaxAge] = useQueryState(
    "maxAge",
    parseAsInteger.withDefault(20).withOptions({ clearOnDefault: true }),
  );

  const clearFilters = () => {
    void setMinAge(null);
    void setMaxAge(null);
    setSliderUsed(false);
    setAgeSliderValues([0, 20]);
    void setSelectedBreeds([]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex">
          <SortSelect />
        </div>
        <div className="flex flex-row flex-wrap gap-4 pt-4">
          <BreedPicker />
          <AgeSlider />
        </div>

        <div className="flex flex-col flex-wrap gap-4">
          {sliderUsed || selectedBreeds.length > 0 ? (
            <div className="flex flex-row items-center gap-2 pt-2">
              <span>Active Filters</span>
              <Button
                size="sm"
                variant="ghost"
                className="text-stone-500 dark:text-stone-400"
                onClick={clearFilters}
              >
                Clear <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {/* if slider was used, show the badge, fixes issue when minAge is 0 which is false but a valid value */}
            {sliderUsed ? (
              <FilterBadge>
                Ages {minAge} - {maxAge}
                <FilterBadgeXButton
                  onClick={() => {
                    void setMinAge(null);
                    void setMaxAge(null);
                    setSliderUsed(false);
                    setAgeSliderValues([0, 20]);
                  }}
                />
              </FilterBadge>
            ) : null}
            <div className="flex flex-row flex-wrap gap-2">
              {selectedBreeds.map((selected) => (
                <FilterBadge key={selected}>
                  {selected}
                  <FilterBadgeXButton
                    onClick={() => {
                      void setSelectedBreeds(
                        selectedBreeds.filter((breed) => breed !== selected),
                      );
                    }}
                  />
                </FilterBadge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
