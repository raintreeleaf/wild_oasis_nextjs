"use server";
import { supabase } from "@/app/_lib/supabase";

import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const update = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(update)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in!");
  }
  //You can extract data from formData by doing this:
  // console.log(Object.fromEntries(formData.entries()));
  const newBooking = {
    ...bookingData,
    guestId: session.guestId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  //use zod library for data validation
  console.log(newBooking);
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in!");
  }
  //If you go to browser developer console, under network, you can obtain command line
  //for invoking server actions. User can delete bookings that did not book.
  //The following prevents that.
  const guestBookings = await getBookings(session.user.guestId);
  if (!guestBookings.some((el) => el.id === +bookingId))
    throw new Error("You are not allowed to delete this booking!");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateBooking(formData) {
  //authentication
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in!");
  }
  //authorization
  //If you go to browser developer console, under network, you can obtain command line
  //for invoking server actions. User can delete bookings that did not book.
  //The following prevents that.
  const bookingId = +formData.get("bookingId");
  const guestBookings = await getBookings(session.user.guestId);
  if (!guestBookings.some((el) => el.id === +bookingId))
    throw new Error("You are not allowed to update this booking!");
  //building updated data
  const updatedData = {
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    //supabase can help prevent sql injection. We just need
    //to limit the num of characters.
  };
  //mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();
  //error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  //revalidate
  revalidatePath(`/account/reservations/edit/${formData.get("bookingId")}`);
  //redirect
  redirect("/account/reservations");
}
