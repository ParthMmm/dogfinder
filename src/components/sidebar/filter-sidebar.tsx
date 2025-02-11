import { AgeSlider } from "~/components/filtering/age-slider";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useAtom, useSetAtom } from "jotai";
import {
  ageSliderValuesAtom,
  filterDrawerOpenAtom,
  favoriteDrawerOpenAtom,
  sliderUsedAtom,
} from "~/store/app";
import { FilterBadge, FilterBadgeXButton } from "~/components/filter-badge";
import { BreedPicker } from "~/components/filtering/breed-picker";
import { Button } from "~/components/ui/button";
import { FilterIcon, HeartIcon, MenuIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageSizeSelect } from "~/components/filtering/page-size-select";
import { LocationPicker } from "~/components/filtering/location-picker";
import { locationSet } from "~/hooks/queries/use-get-dogs-search";
import { SortSelect } from "~/components/filtering/sort-select";
import { FilterDrawer } from "~/components/drawers/filter-drawer";
import { FavoriteDrawer } from "~/components/drawers/favorite-drawer";

export function FilterSidebar() {
  const setAgeSliderValues = useSetAtom(ageSliderValuesAtom);
  const setFilterDrawerOpen = useSetAtom(filterDrawerOpenAtom);
  const setFavoriteDrawerOpen = useSetAtom(favoriteDrawerOpenAtom);

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
    <>
      <div className="flex flex-row gap-2">
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setFilterDrawerOpen(true)}
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setFavoriteDrawerOpen(true)}
        >
          <HeartIcon className="h-4 w-4" />
          <span>Favorites</span>
        </Button>
      </div>
      <Card className="hidden w-full md:block">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex gap-2">
            <SortSelect />
            <PageSizeSelect />
          </div>
          <div className="flex flex-row flex-wrap gap-4 pt-4">
            <BreedPicker />
            <AgeSlider />
            <LocationPicker />
          </div>

          <div className="flex flex-col flex-wrap gap-4">
            {sliderUsed ||
            selectedBreeds.length > 0 ||
            locationZipCodes.length > 0 ? (
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
                {locationZipCodes.map((location) => {
                  const locationObject = locationSet.get(location);
                  if (!locationObject) return null;
                  return (
                    <FilterBadge key={location}>
                      {locationObject.city}, {locationObject.state}{" "}
                      <FilterBadgeXButton
                        onClick={() => {
                          void setLocationZipCodes(
                            locationZipCodes.filter((zip) => zip !== location),
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
      <FilterDrawer />
      <FavoriteDrawer />
    </>
  );
}
