// src/pages/Search.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchMutation } from "../redux/api/searchApiSlice";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const Search = () => {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useState("");
  const [
    searchCv,
    {
      isLoading: useSearchQueryLoading,
      isSuccess: useSearchQuerySuccess,
      data: useSearchQueryData,
      isError: useSearchQueryError,
      error: useSearchQueryErrorMsg,
    },
  ] = useSearchMutation();

  const handleSubmit = () => {
    if (!searchKeywords) {
      toast.error("Please enter a search keyword");
      return;
    }

    searchCv({ query: searchKeywords });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-secondary to-primary flex flex-col items-center justify-center">
      {/* Navigation Button */}
      <div className="fixed w-full h-20 top-0 left-0">
        <div className="max-w-5xl w-[92%] h-full mx-auto flex items-center justify-end">
          <button
            onClick={() => navigate("/")} // Navigate to search page
            className="bg-primary text-white rounded-lg px-4 py-2 shadow-md hover:bg-accent transition"
          >
            Upload CV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-primary mb-4">Search CV</h1>
        <p className="text-gray-600 mb-6">
          Quickly search for CVs and find exactly what you're looking for.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter search keywords..."
            onChange={(e) => setSearchKeywords(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            disabled={useSearchQueryLoading}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-lg shadow-lg transition mt-6 flex items-center justify-center ${
              useSearchQueryLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-accent cursor-pointer"
            }`}
          >
            {useSearchQueryLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" /> Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {useSearchQueryData?.results ? (
        <div className="overflow-x-auto w-full mt-6">
          <div className="flex gap-4 p-4">
            {useSearchQueryData?.results?.map((data, idx) => {
              return (
                <div
                  key={idx} // Ensure each element has a unique key
                  className="border-gray-300 rounded-lg overflow-hidden shadow-lg border relative p-2 flex-shrink-0 w-[250px]"
                >
                  <embed
                    src={data?.downloadUrl}
                    type="application/pdf"
                    className="w-full h-64 mb-4"
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={() => window.open(data.downloadUrl, "_blank")}
                      className="bg-primary text-white rounded-lg py-1 px-3 hover:bg-accent"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
