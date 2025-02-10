import { type SortOption } from "~/lib/api/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { parseAsString, useQueryState } from "nuqs";

const sortOptions: Record<SortOption, string> = {
  "breed:asc": "Breed: A-Z",
  "breed:desc": "Breed: Z-A",
  "name:asc": "Name: A-Z",
  "name:desc": "Name: Z-A",
  "age:asc": "Age: Puppy-20",
  "age:desc": "Age: 20-Puppy",
};

export function SortSelect() {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("breed:asc"),
  );

  return (
    <Select defaultValue={sort} onValueChange={(val) => setSort(val)}>
      <SelectTrigger className="w-[160px]">
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
  );
}
