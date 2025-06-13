import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateBooking } from "@/app/_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";

export default async function Page({ params }) {
  // CHANGE
  // const reservationId = 23;
  // const maxCapacity = 23;
  const { bookingId } = params;
  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="bookingId" value={bookingId} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option
                value={x}
                key={x}
                // you cannot return a string in an expression as a single attribute in jsx
                //if you have to include single attributes like, disabled, selected
                //you have to include a boolean value
                // selected={x === +numGuests ? true : false}
              >
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
