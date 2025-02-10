import { type ReactElement } from "react";
import { AuthenticatedLayout } from "~/layout/authenticated-layout";
import Head from "next/head";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";

import { Card, CardContent } from "~/components/ui/card";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { HeartIcon } from "lucide-react";
import { FilterSidebar } from "~/components/filter-sidebar";

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
              {"find a dog"}
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
      <div className="w-full md:w-1/4">
        <FilterSidebar />
      </div>
      <div className="w-full overflow-y-auto pb-6 md:w-3/4">
        <DogTable />
      </div>
    </div>
  );
}

function DogTable() {
  const { data, isPending, isError } = useGetDogsSearch();

  if (!data) {
    return null;
  }
  if (isError) {
    return <div>error</div>;
  }

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} className="w-full md:min-w-[200px]">
            <CardContent className="p-0">
              <div className="aspect-[3/4] w-full animate-pulse rounded-t-md bg-stone-500 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96 md:w-[200px]" />

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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {data.map((dog) => {
        return (
          <Card key={dog.id} className="w-full md:min-w-[200px]">
            <CardContent className="p-0">
              <Image
                src={dog.img}
                width={200}
                height={266}
                className="aspect-[3/4] w-full rounded-t-md bg-gray-200 object-cover sm:aspect-auto sm:h-72"
                alt="picture of a dog"
              />

              <div className="flex flex-row justify-between p-4">
                <div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-medium leading-4">
                      {dog.name}
                    </h3>
                    <p className="text-lg text-neutral-700 dark:text-neutral-400">
                      {dog.breed}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2 pt-2">
                    {dog.age === 0 ? (
                      <p className="text-sm">Puppy</p>
                    ) : (
                      <p className="text-sm">{dog.age} years old</p>
                    )}
                  </div>
                  <p className="text-sm tabular-nums">{dog.zip_code}</p>
                </div>{" "}
                <div>
                  <Button
                    variant="none"
                    size="icon"
                    className="hover:text-red-500"
                  >
                    <HeartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
