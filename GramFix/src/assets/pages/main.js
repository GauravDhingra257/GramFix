import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../../App.css";
import Tesseract from "tesseract.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Saved from "./saved";

const Main = ({ savedtext, setsavedtext }) => {
  //state variables
  const [selectedFile, setSelectedFile] = useState();
  //   const [savedtext, setsavedtext] = useState([]);
  const [loading, setloading] = useState(false);
  const [text, settext] = useState("");
  const [text2, settext2] = useState("");
  const [textreco, settextreco] = useState(false);
  const [grammer, setgrammer] = useState(false);
  //Function to handelclicks
  const handelclick = async (e) => {
    text !== "" ? setloading(true) : setloading(false);
      console.log("clicked fixit")
      settext2("");
      setgrammer(true);
      fetch("/fixgrammer", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.toString() }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          settext2(data.fixed);
          setloading(false);
          setgrammer(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          settext2(err.toString());
          setgrammer(false);
        });
    

  };

  //function to delete object from savedtext state
  const deleteobj = (id) => {
    // console.log(id);
    var deleted = savedtext.filter((ele, index) => {
      return index !== id;
    });
    setsavedtext(deleted);
    console.log(deleted);
  };
  //function to save text in array
  const savefunction = (txt) => {
    let textinstring = {
      text: txt.toString(),
      time: new Date().toLocaleString(),
    };
    textinstring = savedtext.concat(textinstring);
    txt !== ""
      ? setsavedtext(textinstring)
      : alert("Please enter something before saving");
  };

  useEffect(() => {
    if (selectedFile) {
      Tesseract.recognize(selectedFile, "eng")
        .then(({ data }) => {
          //   console.log(data);
          settextreco(false);
          settext(data.text);
          setSelectedFile();
        })
        .catch((e) => {
          settextreco(false);
          console.log(e);
          setSelectedFile();
        });
    }
  }, [selectedFile]);
  return (
    <>
      <Navbar />
      <div class="container my-4">
        {/* Textbox area */}
        <div className="row d-flex justify-content-around">
          <div class="col-12 col-lg-6 d-flex flex-column text-box-area align-item-center justify-content-center">
            <div className="buttons">
              <button onClick={() => savefunction(text)}>
                <i class="fa-solid fa-floppy-disk"></i>
                <p>save</p>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
              >
                <i class="fa-solid fa-clipboard"></i>
                <p>copy</p>
              </button>
              <button
                onClick={async () => {
                  let clipboardtxt = await navigator.clipboard.readText();
                  if (clipboardtxt) {
                    settext(clipboardtxt.toString());
                  }
                }}
              >
                <i class="fa-solid fa-paste"></i>
                <p>Paste</p>
              </button>
            </div>
            <div className="button-2">
              <button
                value="UpperCase"
                onClick={() => {
                  settext2(text.toUpperCase());
                }}
              >
                {/* <i class="fas fa-font"></i> */}
                <h3>U</h3>
              </button>
              <button
                value="Lowercase"
                onClick={() => {
                  settext2(text.toLowerCase());
                }}
              >
                {/* <i class="fa-solid fa-clipboard"></i> */}
                <h3>L</h3>
              </button>
            </div>
            <h4>Input </h4>
            <textarea
              placeholder="Enter your text here......"
              disabled={textreco}
              className="my-2 textbox"
              value={text}
              onInput={(e) => {
                settext(e.target.value);
              }}
              cols="70"
              rows="14"
            ></textarea>
            {textreco ? (
              <>
                <img
                  style={{
                    height: "40%",
                    width: " 60%",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  src="https://i.stack.imgur.com/hzk6C.gif"
                />
              </>
            ) : (
              ""
            )}
            <p className="m-3">
              words = {text === "" || !text ? 0 : text.trim().split(" ").length}{" "}
              characters=
              {text.trim().length}
            </p>
          </div>

          <div className="col-12 col-lg-6 d-flex flex-column text-box-area align-item-center justify-content-center">
            <div className="buttons">
              <button onClick={() => savefunction(text2)}>
                <i class="fa-solid fa-floppy-disk"></i>
                <p>save</p>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text2);
                }}
              >
                <i class="fa-solid fa-clipboard"></i>
                <p>copy</p>
              </button>
              <button
                onClick={() => {
                  settext2("");
                }}
              >
                <i class="fa-solid fa-trash-can"></i>
                <p>clear</p>
              </button>
            </div>
            <h4>Output </h4>
            <textarea
              className="my-2 textbox"
              value={text2}
              readOnly={true}
              cols="80"
              rows="14"
            ></textarea>
              {grammer ? (
              <>
                <img
                  style={{
                    height: "40%",
                    width: " 60%",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  src="https://i.stack.imgur.com/hzk6C.gif"
                />
              </>
            ) : (
              ""
            )}
            <p className="m-3">
              words = {(text2 === "" || typeof text2 === 'undefined') ? 0 : text2.trim().split(" ").length}{" "}
              characters=
              {typeof text2 !== 'undefined'?text2.trim().length:0}
            </p>
          </div>
        </div>
        {/* Buttons to all feature */}
        <div className="d-flex container flex-wrap justify-content-center my-4 ">
          <button
            value="fixgrammer"
            onClick={handelclick}
            disabled={loading}
            className={
              (loading ? "btn-secondary" : "btn-success") +
              " rounded m-2 px-4 py-2 "
            }
          >
            <p className="m-0 p-0" style={{"font-weight": "bold"}}>Fix It</p>
          </button>
        </div>
        <div class="drop-zone">
          <input
            type="file"
            onChange={(event) => {
              try {
                setSelectedFile(URL.createObjectURL(event.target.files[0]));
                settextreco(true);
              } catch (e) {
                settextreco(false);
              }
            }}
            accept="image/*"
            className="inputfile"
          />

          {selectedFile ? (
            <img style={{ height: "100%", width: "100%" }} src={selectedFile} />
          ) : (
            <span class="drop-zone__prompt">
              Drop image here or click to upload for OCR
            </span>
          )}
          {/* <input type="file" name="myFile" class="drop-zone__input"/> */}
        </div>
      </div>
    </>
  );
};

export default Main;
