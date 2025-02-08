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
          <button className="inline-flex h-8 items-center overflow-hidden rounded-md border border-neutral-700 bg-neutral-800 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:pointer-events-none disabled:opacity-50">
            <div className="flex items-center justify-start px-3 align-middle">
              {"Breed"}
            </div>
          </button>
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
      <div className="flex flex-row gap-2">
        {selectedBreeds.map((selected) => (
          <Badge
            key={selected}
            className="gap-1 border-orange-600/20 bg-orange-50 dark:border-orange-400/20 dark:bg-orange-400/10"
            variant={"none"}
          >
            <span className="text-orange-800 dark:text-orange-500">
              {selected}
            </span>
            <button
              onClick={() => {
                void setSelectedBreeds(
                  selectedBreeds.filter((breed) => breed !== selected),
                );
              }}
              className="rounded-sm text-stone-400 transition-colors hover:text-stone-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-500 focus-visible:ring-0 dark:text-stone-700"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
}
