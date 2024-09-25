import React from "react"

const HighlightedText = ({text,color}) => {
  return (
    <span style={{color: color}}>
      {text}
    </span>
  )
};

export default HighlightedText;
