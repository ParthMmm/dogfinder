import { type ReactElement } from "react";
import { AuthenticatedLayout } from "~/layout/authenticated-layout";
import Head from "next/head";

import { FilterSidebar } from "~/components/sidebar/filter-sidebar";

import { FavoriteSidebar } from "~/components/sidebar/favorite-sidebar";
import { Button } from "~/components/ui/button";
import { FilterIcon, HeartIcon } from "lucide-react";
import {
  MatchMobileView,
  MatchSidebar,
} from "~/components/sidebar/match-sidebar";
import { favoriteDrawerOpenAtom } from "~/store/app";
import { useSetAtom } from "jotai";
import { filterDrawerOpenAtom } from "~/store/app";
import { DogTable } from "~/components/dog-table";

export default function Page() {
  return (
    <>
      <Head>
        <title>DogFinder</title>
        <meta name="description" content="DogFinder" />
      </Head>

      <div className="container mx-auto h-full space-y-4 px-4 py-4 md:space-y-12 md:py-10">
        <div className="flex flex-row items-center justify-between align-middle">
          <div className="text-left">
            <div className="text-3xl font-bold tracking-tight">
              <h1>Find your match</h1>
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
  const setFilterDrawerOpen = useSetAtom(filterDrawerOpenAtom);
  const setFavoriteDrawerOpen = useSetAtom(favoriteDrawerOpenAtom);

  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-6">
      {/* desktop view */}
      <div className="hidden w-full space-y-4 pb-4 lg:block lg:w-1/4 lg:overflow-y-auto">
        <MatchSidebar />
        <FilterSidebar />
        <FavoriteSidebar />
      </div>
      {/* mobile view */}
      <div className="flex flex-col gap-4">
        <MatchMobileView />
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFilterDrawerOpen(true)}
          >
            <FilterIcon className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFavoriteDrawerOpen(true)}
          >
            <HeartIcon className="h-4 w-4" />
            <span>Favorites</span>
          </Button>
        </div>
      </div>
      <div className="w-full overflow-y-auto pb-6 lg:w-3/4">
        <DogTable />
      </div>
    </div>
  );
}
