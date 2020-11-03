import React from "react";

export default function Head(props) {

  React.useEffect(() => {
    document.title = "GHP | " + props.title;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", props.description);
  },[props])

  return (
    <></>
  );
}
