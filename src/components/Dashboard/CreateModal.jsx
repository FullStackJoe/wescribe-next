import React, { useState } from "react";
import CreateMobileForm from "./forms/CreateMobileForm";
import CreateBroadbandForm from "./forms/CreateBroadbandForm";
import CreateStreamingForm from "./forms/CreateStreamingForm";
import styles from "./CreateModal.module.css";
// import OtherForm from "./forms/OtherForm";
// import StreamingForm from "./forms/StreamingForm";

const CreateModal = ({
  addSubscriptionOptimistically,
  toggleEditMode,
  userId,
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [showDropdowns, setShowDropdowns] = useState(false);

  const renderForm = (onClose) => {
    switch (selectedCategory) {
      case "Mobilabonnement":
        return (
          <CreateMobileForm
            onSubmitSuccess={onSubmitSuccess}
            addSubscriptionOptimistically={addSubscriptionOptimistically}
            toggleEditMode={toggleEditMode}
            userId={userId}
            onClose={onClose}
          />
        );
      case "Internet":
        return (
          <CreateBroadbandForm
            onSubmitSuccess={onSubmitSuccess}
            addSubscriptionOptimistically={addSubscriptionOptimistically}
            toggleEditMode={toggleEditMode}
            userId={userId}
            onClose={onClose}
          />
        );
      case "Streaming":
        return (
          <CreateStreamingForm
            onSubmitSuccess={onSubmitSuccess}
            addSubscriptionOptimistically={addSubscriptionOptimistically}
            toggleEditMode={toggleEditMode}
            userId={userId}
            onClose={onClose}
          />
        );
      case "Anden kategori":
        return (
          <div className="flex flex-col items-center">
            <p className="mt-6 mb-2">
              Denne feature er ikke implementeret endnu
            </p>
            <p>Tilføj istedet et mobilabonnement</p>
          </div>
        );
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
            <div className="card-actions flex justify-end">
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
              <h2 className="m-auto text-2xl font-bold">Nyt Abonnement</h2>
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
                <option value="Internet">Internet</option>
                <option value="Streaming">Streaming</option>
                <option value="Anden kategori">Anden kategori</option>
              </select>
            </div>
            {showDropdowns && renderForm(onClose)}
          </div>
        </div>
      </>
    );
  }
};

export default CreateModal;
