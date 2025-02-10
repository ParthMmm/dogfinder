import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { parseAsString, useQueryState } from "nuqs";
import { Label } from "~/components/ui/label";

export function PageSizeSelect() {
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsString.withDefault("25"),
  );

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="pageSize">Items per page</Label>
      <Select value={pageSize} onValueChange={(val) => setPageSize(val)}>
        <SelectTrigger className="w-[120px]" id="pageSize">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
