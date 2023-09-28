import React, { useState } from "react";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [size, setSize] = useState(12);
  const [color, setColor] = useState("");

  //   function for uppercase
  const handleUpClick = () => {
    console.log(text.toUpperCase());
    setText(text.toUpperCase());
    props.showAlert("Changed to UpperCase", "success");
  };

  // function for lowercase
  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Changed to LowerCase", "success");
  };

  // function for clearnig the text
  const handleClear = () => {
    setText("");
    props.showAlert("Removed Text", "success");
  };

  // function to make text bigger
  const handleBigText = () => {
    setIsActive(true);
    setSize(size + 2);
    props.showAlert("Text size changed", "success");
  };

  // function to change color.
  const handleColor = () => {
    document.getElementById("myBox").style.color = "red";
  };

  // function for toggler
  const toggler = () => {
    setColor(color === "" ? "active" : "");
  };

  // function to copy text inside the textbox
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    // document.getSelection().removeAllRanges();
  };

  // function to remove extra spaces
  const removeExtraSps = () => {
    let rmTxt = text.split(/[ ]+/);
    setText(rmTxt.join(" "));
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  // Validation
  const zero = () => {
    if (text === "" && text.length === 0) {
      return (
        <p>
          0 words & {text.length} characters <br /> 0 Minutes read
        </p>
      );
    } else {
      return (
        <p>
          {text.split(/\s+/).filter((ele) => ele.length !== 0).length} words &{" "}
          {text.length} characters <br />
          {0.008 * text.split(" ").length} Minutes read
        </p>
      );
    }
  };
  return (
    <>
      <div
        className="container my-5"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>
          {/*className={`text-${props.mode === "light" ? "black" : "white"}`}> */}
          {props.heading}
        </h1>
        <div className="mb-3">
          <textarea
            style={{
              fontSize: isActive ? `${size}px` : "",
              backgroundColor:
                color === "active"
                  ? "blue"
                  : "" || props.mode === "dark"
                  ? "#042743"
                  : "",

              color: props.mode === "dark" ? "white" : "",
            }}
            className={`form-control`}
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
          ></textarea>
        </div>
        {/* {text && ( */}{" "}
        {/* If text area was empty, buttons would not be seen */}
        <div className="buttons">
          <button
            disabled={text.length === 0} //btn is disabled until sth is typed
            className="btn btn-primary mx-1 my-1"
            onClick={handleUpClick}
          >
            Convert to {"uppercase".toUpperCase()}
          </button>{" "}
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleLoClick}
          >
            Convert to {"lowercase".toLowerCase()}
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleClear}
          >
            Clear Text
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleBigText}
          >
            Bigger Text
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleColor}
          >
            Change Color
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={toggler}
          >
            Toggler
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={handleCopy}
          >
            Copy Text
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
            onClick={removeExtraSps}
          >
            Remove Extra Spaces
          </button>
        </div>
        {/* )} */}
      </div>

      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>Your Text Summary</h1>
        {zero()}
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Nothing to Preview!"}</p>
      </div>
    </>
  );
};

export default TextForm;
