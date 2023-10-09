import React, { useState } from "react";

export default function MobileSubscriptionForm({
  toggleEditMode,
  userId,
  onClose,
  addSubscriptionOptimistically,
  onSubmitSuccess,
}) {
  const [provider, setProvider] = useState("");
  const [data, setData] = useState("");
  const [talktime, setTalktime] = useState("");
  const [price, setPrice] = useState("");
  const [erroMsg, setErrormsg] = useState("");
  const [isTalktimeCheked, setIsTalktimeCheked] = useState(false);
  const [isDataCheked, setIsisDataCheked] = useState(false);

  const submit = async () => {
    if (provider == "") {
      setErrormsg("Vælg venligst en udbyder");
      return;
    }
    if (data == "") {
      setErrormsg("Angiv venligst data mængde");
      return;
    }
    if (talktime == "") {
      setErrormsg("Angiv venligst taletid");
      return;
    }
    if (price == "") {
      setErrormsg("Angiv venligst en pris");
      return;
    }
    const newSubscription = {
      subscriptionid: Math.random().toString(),
      type: "Mobile",
      provider,
      talktime: isTalktimeCheked ? 9999 : talktime,
      datamonth: isDataCheked ? 9999 : data,
      pricemonth: price,
    };

    addSubscriptionOptimistically(newSubscription);
    onClose();

    toggleEditMode();

    // Create a JSON object with the selected data
    const formData = {
      Provider: provider,
      DataMonth: data,
      Talktime: talktime,
      PriceMonth: price,
      Userid: userId,
    };

    try {
      // Make a POST request to the endpoint
      const response = await fetch("/api/createMobileSubscription", {
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
        setData("");
        setTalktime("");
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

  const handleTalktimeCheked = () => {
    setIsTalktimeCheked((prev) => !prev);
    if (!isTalktimeCheked) {
      setTalktime(9999);
    } else {
      setTalktime("");
    }
  };

  const handleDataCheked = () => {
    setIsisDataCheked((prev) => !prev);
    if (!isDataCheked) {
      setData(9999);
    } else {
      setData("");
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
            <option value="CallMe">CallMe</option>
            <option value="Oister">Oister</option>
            <option value="Telmore">Telmore</option>
            <option value="Telia">Telia</option>
            <option value="Telenor">Telenor</option>
            <option value="OK">OK</option>
            <option value="Eesy">Eesy</option>
            <option value="YouSee">YouSee</option>
            <option value="Lebara">Lebara</option>
            <option value="Flexii">Flexii</option>
            <option value="Duka">Duka</option>
          </select>
        </div>
        <div className="flex flex-col items-center pt-3 w-2/12">
          <div>
            <p className="font-bold">Data</p>
            Fri {"  "}
            <input
              type="checkbox"
              checked={isDataCheked}
              onClick={handleDataCheked}
              className="toggle ml-2"
            />
          </div>
          <input
            type="text"
            disabled={isDataCheked}
            placeholder="GB"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center pt-3 w-2/12">
          <div>
            <p className="font-bold">Taletid</p>
            Fri {"  "}
            <input
              type="checkbox"
              checked={isTalktimeCheked}
              onClick={handleTalktimeCheked}
              className="toggle ml-2"
            />
          </div>
          <input
            type="text"
            disabled={isTalktimeCheked}
            placeholder="timer"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setTalktime(e.target.value)}
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
