import React from "react";

const Pricing = ({ id }) => {
  const plans = [
    {
      name: "Osnovni paket",
      price: "30€",
      frequency: "/mesec",
      features: ["Neomejeno Storyijev", "Dogodki v Week in review"],
      buttonLabel: "Get Basic Access",
      buttonStyle: "bg-gray-700 text-white", // Updated for dark theme
    },
    {
      name: "Standard paket",
      price: "35€",
      frequency: "/mesec",
      features: [
        "Neomejeno Objav",
        "Neomejeno Storyijev",
        "Dogodki v Week in review",
      ],
      buttonLabel: "Get Standard Access",
      buttonStyle: "bg-gray-700 text-white", // Updated for dark theme
    },
    {
      name: "Premium paket",
      price: "50€",
      frequency: "/mesec",
      features: [
        "Neomejeno Objav",
        "Neomejeno Storyijev",
        "Dogodki v Week in review",
        "Promocija preko promotorjev",
        "Najem Content ekipe",
      ],
      buttonLabel: "Get Premium Access",
      buttonStyle: "bg-gray-700 text-white", // Updated for dark theme
    },
  ];

  return (
    <div id={id} className="py-16 px-8 bg-gray-900 text-center ">
      {/* Header Section */}
      <h2 className="text-3xl font-bold mb-4 text-white">Naročnine</h2>
      <p className="text-gray-400 mb-12">Izberi paket in doseži tisoče ljudi</p>

      {/* Pricing Cards */}
      <div className="mx-48 grid gap-12 md:grid-cols-3 ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex shadow-2xl flex-col justify-between py-12 px-4 border hover:border-custom-orange rounded-lg bg-gray-800 text-white"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <div className="flex justify-center items-baseline mb-4">
                <span className="text-4xl font-bold text-custom-orange">
                  {plan.price}{" "}
                </span>
                <span className="text-lg ml-1"> {plan.frequency}</span>
              </div>
            </div>
            <div>
              <ul className="mb-6 space-y-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-center text-gray-300"
                  >
                    <span className="mr-2">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-3 rounded-md font-semibold ${plan.buttonStyle} hover:opacity-90 hover:bg-custom-orange`}
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
