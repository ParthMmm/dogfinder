import { type ReactElement } from "react";
import { AuthenticatedLayout } from "~/layout/authenticated-layout";
import Head from "next/head";
import { useGetDogsSearch } from "~/hooks/queries/use-get-dogs-search";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card, CardContent } from "~/components/ui/card";
import { useGetDogBreeds } from "~/hooks/queries/use-get-dog-breeds";
import { BreedPicker } from "~/components/breed-picker";

export default function Page() {
  return (
    <>
      <Head>
        <title>DogFinder</title>
        <meta name="description" content="DogFinder" />
      </Head>

      <div className="max-w-7xl h-full mx-auto">
        <div className="mx-auto space-y-6 py-4 md:space-y-12 md:py-10">
          <div className="flex flex-row items-center justify-between align-middle">
            <div className="text-left">
              <div className="text-3xl font-bold tracking-tight">{"find a dog"}</div>
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
  const { data } = useGetDogsSearch();
  const { data: breeds } = useGetDogBreeds();

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <Input className="max-w-[200px]" />
        <BreedPicker />
      </div>

      <div className="grid grid-cols-4">
        {data?.resultIds?.map((id) => {
          return (
            <Card key={id}>
              <CardContent>{id}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
