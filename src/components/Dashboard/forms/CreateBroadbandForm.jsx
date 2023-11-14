import React, { useState } from "react";

export default function BroadbandSubscriptionForm({
  toggleEditMode,
  userId,
  onClose,
  addSubscriptionOptimistically,
  onSubmitSuccess,
}) {
  const [provider, setProvider] = useState("");
  const [uploadSpeed, setuploadSpeed] = useState("");
  const [downloadSpeed, setdownloadSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [erroMsg, setErrormsg] = useState("");

  const submit = async () => {
    if (provider == "") {
      setErrormsg("Vælg venligst en udbyder");
      return;
    }
    if (uploadSpeed == "") {
      setErrormsg("Angiv venligst data mængde");
      return;
    }
    if (downloadSpeed == "") {
      setErrormsg("Angiv venligst data mængde");
      return;
    }
    if (price == "") {
      setErrormsg("Angiv venligst en pris");
      return;
    }
    const newSubscription = {
      subscriptionid: Math.random().toString(),
      type: "internet",
      provider,
      uploadSpeed,
      downloadSpeed,
      pricemonth: price,
    };

    addSubscriptionOptimistically(newSubscription);
    onClose();

    toggleEditMode();

    // Create a JSON object with the selected data
    const formData = {
      provider: provider,
      uploadSpeed: uploadSpeed,
      downloadSpeed: downloadSpeed,
      priceMonth: price,
      userId: userId,
    };

    try {
      // Make a POST request to the endpoint
      const response = await fetch("/api/createBroadbandSubscription", {
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
        setuploadSpeed("");
        setdownloadSpeed("");
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
            <option value="Hiper">Hiper</option>
            <option value="FastSpeed">FastSpeed</option>
            <option value="JetNet">JetNet</option>
            <option value="Telia">Telia</option>
            <option value="MaxSpeed">MaxSpeed</option>
            <option value="KvikNet">OKvikNetK</option>
            <option value="Stofa">Stofa</option>
            <option value="YouSee">YouSeev</option>
          </select>
        </div>
        <div className="flex flex-col items-center pt-3 w-3/12">
          <div>
            <p className="font-bold">Upload Hastighed</p>
          </div>
          <input
            type="text"
            placeholder="Mbit/s"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setuploadSpeed(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center pt-3 w-3/12">
          <div>
            <p className="font-bold">Download Hastighed</p>
          </div>
          <input
            type="text"
            placeholder="Mbit/s"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setdownloadSpeed(e.target.value)}
          />
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
