import React, { useState, useEffect } from "react";
import bsCustomFileInput from "bs-custom-file-input";
const Publication = () => {
  const Post = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = document.getElementById("inputGroupFile01").files;
    formData.append("PostID", "61ca45e755fc3d1e2f1e2283");
    formData.append("img", file[0]);

    fetch("/api/upload/post/image", {
      method: "POST",
      body: formData,
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <div className="col p-3  ">
      <div classname="container">
        <h1 className="mb-3"> Upload post image </h1>
        <form>
          <h5>Choisir un fichier</h5>
          <div className="input-group mb-3 w-75">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input "
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                required
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                Choisir fichier
              </label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={(e) => Post(e)}
          >
            Upload
          </button>
        </form>
        <img
          src="/api/get/post/image/61ca45e755fc3d1e2f1e2283"
          className="img-thumbnail"
          style={{
            height: "50%",
            width: "50%",
            backgroundSize: "cover",
          }}
        />
      </div>
    </div>
  );
};
export default Publication;
