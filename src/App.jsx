import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const getUrl = () => {
    setLoading(true);
    axios
      .post("https://qr-code-read-generate.onrender.com/api/generate-qr", {
        text,
      })
      .then((res) => {
        setUrl(res.data?.url);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (!text) {
      setUrl("");
    }
  }, [text]);

  return (
    <>
      <header className="text-center bg-primary py-2 text-white fw-bold te">
        <h1 style={{ fontSize: "24px" }}>QR Code Generator</h1>
      </header>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="card p-4 main-card">
            {/* <input type="text" className="w-100" placeholder="Enter Text..." /> */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter text..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <button
              className="btn btn-primary fw-bold btn-text"
              type="button"
              onClick={() => {
                !text ? alert("Enter something!") : getUrl();
              }}
            >
              {loading
                ? "Generating..."
                : (!loading && url)
                ? "Generated"
                : "Generate"}
            </button>
            {url && (
              <div className=" mt-2 w-100 d-flex justify-content-center align-items-center">
                <img style={{ width: "80%" }} src={url} alt="QR Code" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
