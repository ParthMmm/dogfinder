import { Check, FilterIcon, X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";
import { parseAsString, parseAsArrayOf, useQueryState } from "nuqs";

export function LocationPicker() {
  const [selectedLocations, setSelectedLocations] = useQueryState(
    "locations",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const { locations } = useGetDogsSearch();

  if (!locations) return null;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <span className="flex items-center justify-start align-middle">
              <FilterIcon className="mr-2 h-4 w-4" />
              {"Location"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0" align="start">
          <Command>
            <CommandList>
              <CommandInput />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {locations?.map((option) => {
                  if (!option?.zip_code) return null;

                  const isSelected = selectedLocations.includes(
                    option.zip_code,
                  );

                  return (
                    <CommandItem
                      key={option.zip_code}
                      onSelect={() => {
                        //if already selected, use filter to remove it, otherwise add it
                        void setSelectedLocations(
                          isSelected
                            ? selectedLocations.filter(
                                (location) => location !== option.zip_code,
                              )
                            : [...selectedLocations, option.zip_code],
                        );
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-neutral-700",
                          isSelected ? "text-text-high" : "[&_svg]:invisible",
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>
                        {option.city}, {option.state}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedLocations.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        void setSelectedLocations([]);
                      }}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
