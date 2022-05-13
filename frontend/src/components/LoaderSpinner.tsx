import React from "react";
import { Spinner } from "react-bootstrap";
import "./LoaderSpinner.css";

export interface ILoaderButtonProp {
  isLoading: boolean;
  className: string;
  disabled: boolean;
  [x: string]: any;
}

export default function LoaderSpinner() {
  return (
    <div className="spinner-container">
      <Spinner
        animation="grow"
        variant="primary"
        style={{ width: "4rem", height: "4rem" }}
      />
    </div>
  );
}
