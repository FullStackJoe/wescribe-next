import React, { useState } from "react";
import CreateMobileForm from "./forms/CreateMobileForm";
import styles from "./CreateModal.module.css";
// import OtherForm from "./forms/OtherForm";
// import BroadbandForm from "./forms/BroadbandForm";
// import StreamingForm from "./forms/StreamingForm";

const CreateModal = ({ userId, isOpen, onClose, onSubmitSuccess }) => {
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [showDropdowns, setShowDropdowns] = useState(false);

  const renderForm = (onClose, onSubmitSuccess) => {
    switch (selectedCategory) {
      case "Mobilabonnement":
        return (
          <CreateMobileForm
            userId={userId}
            onClose={onClose}
            onSubmitSuccess={onSubmitSuccess}
          />
        );
      case "Bredbånd":
        // return <BroadbandForm />;
        return "";
      case "Streaming":
        // return <StreamingForm />;
        return "";
      case "Anden kategori":
        // return <OtherForm />;
        return "";
      default:
        return null; // Render nothing if no category is selected
    }
  };

  const handleChange = (value) => {
    setSelectedCategory(value);
    setShowDropdowns(true);
  };

  if (isOpen) {
    return (
      <>
        <div className={styles.aboform}>
          <div className={styles.modal_content}>
            <div className="card-actions justify-end">
              <button
                className="btn btn-square btn-sm close-button"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="m-auto text-2xl">Nyt Abonnement</h2>
              <select
                className="select select-bordered border-black select-sm w-full max-w-xs mt-3"
                value={selectedCategory}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              >
                <option disabled value="default">
                  Vælg abonnements type
                </option>
                <option value="Mobilabonnement">Mobilabonnement</option>
                <option value="Bredbånd">Bredbånd</option>
                <option value="Streaming">Streaming</option>
                <option value="Anden kategori">Anden kategori</option>
              </select>
            </div>
            {showDropdowns && renderForm(onClose, onSubmitSuccess)}
          </div>
        </div>
      </>
    );
  }
};

export default CreateModal;
