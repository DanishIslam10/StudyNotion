import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Btn = ({
  textColor,
  linkTo,
  color,
  children,
  disabled,
  onClickFunction,
  type = "button",
  style = {}, // Default style prop to an empty object
}) => {
  // Define common styles for the button
  const buttonStyles = {
    backgroundColor: color,
    color: textColor,
    py: 1,
    px: 2,
    borderRadius: "0.4rem",
    fontWeight: 500,
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    ...style, // Merge parent-provided styles with existing styles
  };

  // Use Material UI Button with conditional Link
  const buttonElement = (
    <Button
      onClick={onClickFunction}
      sx={buttonStyles}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  );

  return linkTo ? (
    <Link to={linkTo} style={{ textDecoration: "none" }}>
      {buttonElement}
    </Link>
  ) : (
    buttonElement
  );
};

// PropTypes for type checking
Btn.propTypes = {
  textColor: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClickFunction: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object, // Accept style prop as an object
};

export default Btn;
