import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Btn = ({
  textColor = "#000814",
  linkTo,
  color = "#FFD60A",
  children,
  disabled = false,
  onClickFunction,
  type = "button",
  style = {},
  variant = "primary",
  fullWidth = false,
}) => {

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${color}, #ffb703)`,
      color: textColor,
      boxShadow: "0 10px 30px rgba(255, 214, 10, 0.25)",
      border: "1px solid rgba(255,255,255,0.08)",
    },

    secondary: {
      background: "rgba(255,255,255,0.05)",
      color: "#F1F2FF",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },

    danger: {
      background: "linear-gradient(135deg, #EF476F, #ff6b8a)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(239, 71, 111, 0.25)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
  };

  const selectedVariant = variants[variant] || variants.primary;

  const buttonStyles = {
    px: 3,
    py: 1.4,
    borderRadius: "14px",
    fontWeight: 600,
    fontSize: "0.95rem",
    textTransform: "none",
    letterSpacing: "0.3px",
    transition: "all 0.3s ease",
    overflow: "hidden",
    position: "relative",
    width: fullWidth ? "100%" : "fit-content",

    ...selectedVariant,

    "&:hover": {
      transform: "translateY(-2px) scale(1.02)",
      filter: "brightness(1.05)",
      boxShadow: selectedVariant.boxShadow,
    },

    "&:active": {
      transform: "scale(0.98)",
    },

    "&.Mui-disabled": {
      opacity: 0.5,
      color: "#9CA3AF",
      background: "#2C333F",
    },

    ...style,
  };

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

Btn.propTypes = {
  textColor: PropTypes.string,
  linkTo: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClickFunction: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  fullWidth: PropTypes.bool,
};

export default Btn;