import React, { useState } from "react";

export default function BroadbandSubscriptionForm({
  toggleEditMode,
  userId,
  onClose,
  addSubscriptionOptimistically,
  onSubmitSuccess,
}) {
  const [provider, setProvider] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [erroMsg, setErrormsg] = useState("");

  const submit = async () => {
    if (provider == "") {
      setErrormsg("Vælg venligst en udbyder");
      return;
    }
    if (plan == "") {
      setErrormsg("Angiv venligst data mængde");
      return;
    }
    if (price == "") {
      setErrormsg("Angiv venligst en pris");
      return;
    }
    const newSubscription = {
      subscriptionid: Math.random().toString(),
      type: "streaming",
      provider,
      plan,
      pricemonth: price,
    };

    addSubscriptionOptimistically(newSubscription);
    onClose();

    toggleEditMode();

    // Create a JSON object with the selected data
    const formData = {
      provider: provider,
      plan: plan,
      priceMonth: price,
      userId: userId,
    };

    try {
      // Make a POST request to the endpoint
      console.log(plan);
      const response = await fetch("/api/createStreamingSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Data was successfully sent
        const responseData = await response.json();

        onSubmitSuccess(responseData, newSubscription.subscriptionid);

        setProvider("");
        setPlan("");
        setPrice("");
      } else {
        // Handle the case where the request was not successful (e.g., show an error message)
        console.error("Failed to submit data.");
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      // Handle any network or request errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center pt-3 w-10/12">
          <p className="font-bold">Udbyder</p>
          <select
            className="select select-bordered border-black select-sm w-full max-w-xs"
            onChange={(e) => setProvider(e.target.value)}
            value={provider}
          >
            <option disabled value="">
              Vælg
            </option>
            <option value="Netflix">Netflix</option>
            <option value="Disney +">Disney</option>
            <option value="TV2 Play">TV2 Play</option>
            <option value="Amazon Prime">Amazon Prime</option>
            <option value="ViaPlay">ViaPlay</option>
          </select>
        </div>
        <div className="flex flex-col items-center pt-3 w-3/12">
          <div>
            <p className="font-bold">Pakke</p>
          </div>
          <select
            className="select select-bordered border-black select-sm w-full max-w-xs"
            onChange={(e) => setPlan(e.target.value)}
            value={plan}
          >
            <option disabled value="">
              Vælg
            </option>
            <option value="Super">Super</option>
            <option value="Mellem">Mellem</option>
            <option value="Lille">Lille</option>
          </select>
        </div>

        <div className="flex flex-col items-center pt-3 w-2/12">
          <p className="font-bold">Pris / md</p>
          <input
            type="text"
            placeholder="kr"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <p>{erroMsg}</p>
        <button
          onClick={submit}
          class="bg-[#008B74] hover:bg-blue-600 text-sm text-white font-bold py-2 px-4 mx-2 rounded inline-flex items-center mt-4"
        >
          <span>Tilføj</span>
        </button>
      </div>
    </>
  );
}
