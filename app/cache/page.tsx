import { unstable_cache } from "next/cache";
import { cache } from "react";

export const dynamic = "force-dynamic";
let fetchCount = 0;
const fetchData = cache(
  unstable_cache(
    async () => {
      fetchCount++;
      return "hello";
    },
    undefined,
    {
      revalidate: 1,
    }
  )
);

export default async function Home() {
  fetchCount = 0;
  const p1 = fetchData();
  const p2 = fetchData();
  const p3 = fetchData();
  await Promise.all([p1, p2, p3]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Calls made {fetchCount}
      </main>
    </div>
  );
}
