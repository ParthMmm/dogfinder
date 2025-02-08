import { type ReactElement } from "react";
import { AuthenticatedLayout } from "~/layout/authenticated-layout";
import Head from "next/head";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";
import { Input } from "~/components/ui/input";

import { Card, CardContent } from "~/components/ui/card";
import { BreedPicker } from "~/components/breed-picker";

import Image from "next/image";

export default function Page() {
  return (
    <>
      <Head>
        <title>DogFinder</title>
        <meta name="description" content="DogFinder" />
      </Head>

      <div className="mx-auto h-full max-w-7xl">
        <div className="mx-auto space-y-6 py-4 md:space-y-12 md:py-10">
          <div className="flex flex-row items-center justify-between align-middle">
            <div className="text-left">
              <div className="text-3xl font-bold tracking-tight">
                {"find a dog"}
              </div>
            </div>
          </div>
          <DogTable />
        </div>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(dashboardPage: ReactElement) {
  return <AuthenticatedLayout>{dashboardPage}</AuthenticatedLayout>;
};

function DogTable() {
  const { data, isPending, isError } = useGetDogsSearch();

  if (!data) {
    return null;
  }

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <Input className="max-w-[200px]" />
        <BreedPicker />
      </div>

      <div className="grid grid-cols-4">
        {data.map((dog) => {
          return (
            <Card key={dog.id}>
              <CardContent>
                <Image
                  src={dog.img}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />

                {dog.name}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
