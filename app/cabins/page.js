import Navigation from "@/app/_components/Navigation";
import CabinList from "@/app/_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
//values defined outside the component are at the route level.
//value for revalidate has to be literal. It cannot be a variable or expression.
// export const revalidate = 15;
// export const revalidate = 3600;
//revalidate no longer valid as the page is dynamically rendered because of searchParams

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  //using searchParams, the page will be dynamically rendered
  const filter = searchParams?.capacity ?? "all";
  // CHANGE
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
