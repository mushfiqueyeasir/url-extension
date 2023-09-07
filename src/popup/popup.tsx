import React, { useEffect, useState } from "react";
import "./popup.css";

const Popup = () => {
  const [names, setNames] = useState([]);

  const handleDelete = (index) => {
    const updatedNames = [...names.slice(0, index), ...names.slice(index + 1)];
    setNames(updatedNames);
    chrome.storage.sync.set({ trackedURLs: updatedNames }, function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Data has been updated in sync storage.");
      }
    });
  };

  useEffect(() => {
    chrome.storage.sync.get({ trackedURLs: [] }, function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        const trackedURLs = result.trackedURLs;
        setNames(trackedURLs || []);
      }
    });
  }, []);

  return (
    <div className="h-screen py-6">
      <h1 className="w-full text-center text-2xl font-bold text-indigo-500">
        URL Tracker
      </h1>
      <div className="flex flex-col items-center gap-y-2 pb-6">
        {names.length > 0 &&
          names.map((item, index) => (
            <div key={index} className="flex flex-row w-full px-6">
              <h1 className="w-full text-start text-xl font-semibold ">
                {item}
              </h1>
              <button
                onClick={() => handleDelete(index)}
                className="px-2 bg-red-400 py-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Popup;
