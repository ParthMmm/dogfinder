import { type ReactElement } from "react";
import { AuthenticatedLayout } from "~/layout/authenticated-layout";
import Head from "next/head";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";

import { Card, CardContent } from "~/components/ui/card";

import { FilterSidebar } from "~/components/sidebar/filter-sidebar";

import { DogCard } from "~/components/dog-card";
import { FavoriteSidebar } from "~/components/sidebar/favorite-sidebar";
import { Button } from "~/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { MatchSidebar } from "~/components/sidebar/match-sidebar";

export default function Page() {
  return (
    <>
      <Head>
        <title>DogFinder</title>
        <meta name="description" content="DogFinder" />
      </Head>

      <div className="container mx-auto h-full space-y-6 px-4 py-4 md:space-y-12 md:py-10">
        <div className="flex flex-row items-center justify-between align-middle">
          <div className="text-left">
            <div className="text-3xl font-bold tracking-tight">
              <h1>Find a dog</h1>
            </div>
          </div>
        </div>
        <DogSearch />
      </div>
    </>
  );
}

Page.getLayout = function getLayout(dashboardPage: ReactElement) {
  return <AuthenticatedLayout>{dashboardPage}</AuthenticatedLayout>;
};

function DogSearch() {
  return (
    <div className="flex h-full flex-col gap-6 md:flex-row">
      <div className="w-full space-y-4 overflow-y-auto pb-4 md:w-1/4">
        <MatchSidebar />
        <FilterSidebar />
        <FavoriteSidebar />
      </div>
      <div className="w-full overflow-y-auto pb-6 md:w-3/4">
        <DogTable />
      </div>
    </div>
  );
}

function DogTable() {
  const { dogsQuery } = useGetDogsSearch();

  if (
    (!dogsQuery.data || dogsQuery.data.length === 0) &&
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

  if (dogsQuery.isPending) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} className="w-full md:min-w-[200px]">
            <CardContent className="p-0">
              <div className="aspect-[3/4] w-full animate-pulse rounded-t-md bg-stone-500 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-72" />

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
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
    <div className="flex flex-row items-center justify-end gap-2">
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
