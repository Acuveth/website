// Cancel.js
import React from "react";

function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-700">
        Subscription Cancelled
      </h1>
      <p className="text-lg mt-4 text-red-600">
        Your subscription process was cancelled. If you need assistance, feel
        free to contact us.
      </p>
      <a
        href="/plans"
        className="mt-6 px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
      >
        Go Back to Home
      </a>
    </div>
  );
}

export default Cancel;
