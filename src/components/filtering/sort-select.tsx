import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { parseAsString, useQueryState } from "nuqs";
import { Label } from "~/components/ui/label";
import { type SortOption } from "~/lib/api/types";

const sortOptions: Record<SortOption, string> = {
  "breed:asc": "Breed: A - Z",
  "breed:desc": "Breed: Z - A",
  "name:asc": "Name: A - Z",
  "name:desc": "Name: Z - A",
  "age:asc": "Age: Puppy - 20",
  "age:desc": "Age: 20 - Puppy",
};

export function SortSelect() {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("breed:asc"),
  );

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="sort">Sort</Label>
      <Select value={sort} onValueChange={(val) => setSort(val)}>
        <SelectTrigger className="w-[180px]" id="sort">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sortOptions).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
