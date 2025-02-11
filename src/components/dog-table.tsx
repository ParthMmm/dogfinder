import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";

import { Card, CardContent } from "~/components/ui/card";

import { DogCard } from "~/components/dog-card";

import { Button } from "~/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

export function DogTable() {
  const { dogsQuery, dogSearchData } = useGetDogsSearch();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  //fix for when the total is set but no dogs are returned, when page is greater than 1
  if (
    (dogSearchData?.total ?? 0) > 0 &&
    dogsQuery?.data?.length === 0 &&
    page > 1
  ) {
    void setPage(1);
  }

  if (dogsQuery.isPending || dogsQuery.isFetching) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} className="w-full md:min-w-[200px]">
            <CardContent className="p-0">
              <div className="aspect-[3/4] h-48 w-full animate-pulse rounded-t-md bg-stone-500 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-72" />

              <div className="p-4">
                <div className="h-6 w-full animate-pulse rounded-md bg-stone-500" />
                <div className="mt-1 h-4 w-full animate-pulse rounded-md bg-stone-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (
    (!dogsQuery.data ||
      dogsQuery.data.length === 0 ||
      dogSearchData?.total === 0) &&
    !dogsQuery.isPending
  ) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-2xl font-bold">No dogs found</div>
      </div>
    );
  }
  if (dogsQuery.isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-2xl font-bold">Error fetching dogs</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {dogsQuery.data.map((dog) => {
          return <DogCard dog={dog} key={dog.id} />;
        })}
      </div>
      <Pagination />
    </>
  );
}

function Pagination() {
  const { total } = useGetDogsSearch();
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(25));

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-row items-center justify-end gap-2 pt-2">
      <div className="flex flex-row items-center justify-center gap-2">
        Page {page.toString()} of {totalPages}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(1)}
        disabled={page === 1}
        aria-label="First page"
      >
        <ChevronsLeftIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (page > 1) {
            void setPage(page - 1);
          }
        }}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (page < totalPages) {
            void setPage(page + 1);
          }
        }}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (page < totalPages) {
            void setPage(totalPages);
          }
        }}
        disabled={page === totalPages}
        aria-label="Last page"
      >
        <ChevronsRightIcon />
      </Button>
    </div>
  );
}
