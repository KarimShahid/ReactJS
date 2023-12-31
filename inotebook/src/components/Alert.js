import React from "react";

const Alert = (props) => {
  // function to capitalize
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <>
      <div style={{ height: "50px" }}>
        {props.alert && (
          <div
            className={`alert alert-dismissible fade show alert-${props.alert.type}`}
            role="alert"
          >
            <strong>
              {capitalize(props.alert.type)}: {props.alert.msg}
            </strong>
          </div>
        )}
      </div>
    </>
  );
};
export default Alert;
