import { Check, X } from "lucide-react";
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
import { useGetDogBreeds } from "~/hooks/queries/use-get-dog-breeds";
import { cn } from "~/lib/utils";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { Button } from "~/components/ui/button";

export function BreedPicker() {
  const [selectedBreeds, setSelectedBreeds] = useQueryState(
    "breeds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const { data: breeds } = useGetDogBreeds();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <span className="flex items-center justify-start align-middle">
              {"Breed"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0" align="start">
          <Command>
            <CommandList>
              <CommandInput />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {breeds?.map((option) => {
                  const isSelected = selectedBreeds.includes(option);
                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => {
                        //if already selected, use filter to remove it, otherwise add it
                        void setSelectedBreeds(
                          isSelected
                            ? selectedBreeds.filter((breed) => breed !== option)
                            : [...selectedBreeds, option],
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
                      <span>{option}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedBreeds.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        void setSelectedBreeds([]);
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
