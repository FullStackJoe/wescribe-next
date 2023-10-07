import React, { useState } from "react";

export default function MobileSubscriptionForm({
  userId,
  onClose,
  onSubmitSuccess,
}) {
  const [provider, setProvider] = useState("");
  const [data, setData] = useState("");
  const [talktime, setTalktime] = useState("");
  const [price, setPrice] = useState("");

  const submit = async () => {
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
      const response = await fetch(
        "http://localhost:5001/api/v1/subscriptions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Data was successfully sent
        onClose();
        onSubmitSuccess();
        // Optionally, you can handle success here
        setProvider("");
        setData("");
        setTalktime("");
        setPrice("");
      } else {
        // Handle the case where the request was not successful (e.g., show an error message)
        console.error("Failed to submit data.");
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
          <p>Udbyder</p>
          <select
            className="select select-bordered border-black select-sm w-full max-w-xs"
            onChange={(e) => setProvider(e.target.value)}
            value={provider}
          >
            <option disabled value="">
              Vælg
            </option>
            <option value="Yousee">CallMe</option>
            <option value="Telia">CBB Mobil</option>
            <option value="Telenor">Oister</option>
            <option value="Telmore">Telmore</option>
            <option value="CallMe">Telia</option>
            <option value="CallMe">Telenor</option>
            <option value="CallMe">OK</option>
            <option value="CallMe">Eesy</option>
            <option value="CallMe">YouSee</option>
            <option value="CallMe">Lebara</option>
            <option value="CallMe">Flexii</option>
            <option value="CallMe">GreenTel</option>
            <option value="CallMe">Alka Mobil</option>
            <option value="CallMe">Duka</option>
          </select>
        </div>
        <div className="flex flex-col items-center pt-3 w-2/12">
          <p>Data</p>

          <input
            type="text"
            placeholder="GB"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center pt-3 w-2/12">
          <p>Tale</p>
          <input
            type="text"
            placeholder="timer"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setTalktime(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center pt-3 w-2/12">
          <p>Pris / md</p>
          <input
            type="text"
            placeholder="kr"
            className="input border-black input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input type="checkbox" className="toggle" checked />
        </div>
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
