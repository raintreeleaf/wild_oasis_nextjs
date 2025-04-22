"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  function handlerFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  const activeFilter = searchParams.get("capacity") || "all";
  return (
    <div className="border border-primary-800 flex">
      <Button
        handlerFilter={handlerFilter}
        filter="all"
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        handlerFilter={handlerFilter}
        filter="small"
        activeFilter={activeFilter}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        handlerFilter={handlerFilter}
        filter="medium"
        activeFilter={activeFilter}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        handlerFilter={handlerFilter}
        filter="large"
        activeFilter={activeFilter}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
}
function Button({ filter, handlerFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handlerFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
