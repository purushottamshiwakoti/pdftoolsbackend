"use client";

import React, { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    // Access the selected file
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // Now you can send formData using fetch or any other method

    // Example using fetch
    fetch("api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle response
        console.log(response);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Page;
