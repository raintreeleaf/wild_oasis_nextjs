"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel }) {
  //useFormStatus must be called in a component nested in a form
  //it will not work if it is called in that form.
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
export default SubmitButton;
