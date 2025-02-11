import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { useAtom, useSetAtom } from "jotai";
import { filterDrawerOpenAtom } from "~/store/app";
import { FilterBadgeXButton } from "~/components/filter-badge";
import { ageSliderValuesAtom, sliderUsedAtom } from "~/store/app";
import { SortSelect } from "~/components/filtering/sort-select";
import { BreedPicker } from "~/components/filtering/breed-picker";
import { PageSizeSelect } from "~/components/filtering/page-size-select";
import { AgeSlider } from "~/components/filtering/age-slider";
import { LocationPicker } from "~/components/filtering/location-picker";
import { Button } from "~/components/ui/button";
import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from "nuqs";
import { XIcon } from "lucide-react";
import { FilterBadge } from "~/components/filter-badge";
import { locationSet } from "~/hooks/queries/use-get-dogs-search";

export function FilterDrawer() {
  const [isOpen, setIsOpen] = useAtom(filterDrawerOpenAtom);
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

  const [locationZipCodes, setLocationZipCodes] = useQueryState(
    "locations",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const clearFilters = () => {
    void setMinAge(null);
    void setMaxAge(null);
    setSliderUsed(false);
    setAgeSliderValues([0, 20]);
    void setSelectedBreeds([]);
    void setLocationZipCodes([]);
  };

  return (
    //snap points not working, think it might have to do with the state handling
    //modal false fixes combobox scroll
    <Drawer
      modal={false}
      dismissible={true}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerContent className="h-1/2">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            <span className="sr-only">Filters</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="flex w-full flex-col items-center justify-center p-2">
            <div className="flex w-full justify-center gap-2">
              <SortSelect />
              <PageSizeSelect />
            </div>
            <div className="flex w-full flex-row justify-center gap-4 pt-4">
              <BreedPicker />
              <AgeSlider />
              <LocationPicker />
            </div>

            <div className="flex w-full flex-col gap-4">
              {sliderUsed ||
              selectedBreeds.length > 0 ||
              locationZipCodes.length > 0 ? (
                <div className="flex w-full flex-row items-center justify-center gap-2 pt-2">
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
                  {locationZipCodes.map((location) => {
                    const locationObject = locationSet.get(location);
                    if (!locationObject) return null;
                    return (
                      <FilterBadge key={location}>
                        {locationObject.city}, {locationObject.state}{" "}
                        <FilterBadgeXButton
                          onClick={() => {
                            void setLocationZipCodes(
                              locationZipCodes.filter(
                                (zip) => zip !== location,
                              ),
                            );
                          }}
                        />
                      </FilterBadge>
                    );
                  })}
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {selectedBreeds.map((selected) => (
                    <FilterBadge key={selected}>
                      {selected}
                      <FilterBadgeXButton
                        onClick={() => {
                          void setSelectedBreeds(
                            selectedBreeds.filter(
                              (breed) => breed !== selected,
                            ),
                          );
                        }}
                      />
                    </FilterBadge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
