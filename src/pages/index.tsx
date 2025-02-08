import Head from "next/head";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Head>
        <title>Fetch</title>
        <meta name="description" content="Fetch" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <LandingPage />
        </div>
      </main>
    </>
  );
}

function LandingPage() {
  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome to DogFinder!
      </h1>
      <p>Find your new furry friend today</p>
      <div className="mt-8 flex justify-center">
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-orange-500 bg-stone-50 px-4 py-2 text-sm font-medium transition-colors hover:text-orange-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-50 dark:bg-stone-950"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
