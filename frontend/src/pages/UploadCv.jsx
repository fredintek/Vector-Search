// src/pages/UploadCV.jsx
import { Loader, Upload, XCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUploadCVMutation } from "../redux/api/uploadApiSlice";
import { useNavigate } from "react-router-dom";

const UploadCV = () => {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [
    uploadCV,
    {
      isLoading: uploadCvLoading,
      isSuccess: uploadCvSuccess,
      data: uploadCvData,
      isError: uploadCvError,
      error: uploadCvErrorMsg,
    },
  ] = useUploadCVMutation();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === "application/pdf") {
  //     const fileUrl = URL.createObjectURL(file); // Generate a blob URL for the file
  //     setPdfPreviewUrl(fileUrl);
  //     setPdfFile(file);
  //   } else {
  //     toast.error("Please upload a valid PDF file."); // Error toast
  //     setPdfPreviewUrl(null);
  //     setPdfFile(null);
  //   }
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      console.log(file); // Log the file properties to make sure it is correct

      const blob = new Blob([file], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(blob);

      console.log(fileUrl); // Log the Blob URL
      setPdfPreviewUrl(fileUrl);
      setPdfFile(file);
    } else {
      toast.error("Please upload a valid PDF file.");
      setPdfPreviewUrl(null);
      setPdfFile(null);
    }
  };

  const handleCancelPreview = () => {
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl); // Revoke the previous Blob URL
    }
    setPdfPreviewUrl(null);
    setPdfFile(null);
    fileInputRef.current.value = null; // Reset the file input
  };

  const handleUpload = async () => {
    if (!pdfPreviewUrl) {
      toast.error("Please upload a CV before submitting.");
      return;
    }

    // Upload the CV to the server
    const formData = new FormData();
    if (!pdfFile) {
      toast.error("No file selected."); // Error toast
      return;
    }
    formData.append("cv", pdfFile);
    uploadCV(formData);
  };

  useEffect(() => {
    if (uploadCvSuccess && uploadCvData) {
      toast.success(uploadCvData.message); // Success toast
      handleCancelPreview(); // Clear the preview and file state
    }

    if (uploadCvError) {
      toast.error(uploadCvErrorMsg?.data?.message || "File upload failed."); // Error toast
      handleCancelPreview(); // Clear the preview and file state
    }

    // Reset the upload state to prevent repeated toasts
    return () => {
      // Clear the states when the component unmounts or when we handle success/errors
      if (uploadCvSuccess || uploadCvError) {
        setPdfPreviewUrl(null);
        setPdfFile(null);
      }
    };
  }, [uploadCvSuccess, uploadCvError, uploadCvData, uploadCvErrorMsg]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
      {/* Navigation Button */}
      <div className="fixed w-full h-20 top-0 left-0">
        <div className="max-w-5xl w-[92%] h-full mx-auto flex items-center justify-end">
          <button
            onClick={() => navigate("/search")} // Navigate to search page
            className="bg-primary text-white rounded-lg px-4 py-2 shadow-md hover:bg-accent transition"
          >
            Go to Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-[92%]">
        <h1 className="text-2xl font-bold text-primary mb-4">Upload Your CV</h1>
        <p className="text-gray-600 mb-6">
          Click below to upload your CV and showcase your skills.
        </p>
        <div className="flex flex-col items-center space-y-6">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
          />

          {/* Custom Upload Button */}
          <button
            onClick={handleFileClick}
            className="flex items-center justify-center w-20 h-20 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition"
          >
            <Upload className="w-10 h-10" />
          </button>

          {/* PDF Preview */}
          {pdfPreviewUrl && (
            <div className="w-full mt-4 border-gray-300 rounded-lg overflow-hidden shadow-lg border relative p-6">
              {/* {console.log(pdfPreviewUrl)} */}
              <embed
                src={pdfPreviewUrl}
                type="application/pdf"
                className="w-full h-64 mb-4"
              />
              {/* Cancel Button */}
              <button
                onClick={handleCancelPreview}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600"
              >
                <XCircle className="w-3 h-3 text-red-500 cursor-pointer" />
              </button>
            </div>
          )}

          <p className="text-sm text-gray-500">Supported format: PDF</p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleUpload}
          disabled={uploadCvLoading} // Disable the button when loading
          className={`w-full py-3 rounded-lg shadow-lg transition mt-6 flex items-center justify-center ${
            uploadCvLoading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-primary text-white hover:bg-accent cursor-pointer"
          }`}
        >
          {uploadCvLoading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" /> Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadCV;
