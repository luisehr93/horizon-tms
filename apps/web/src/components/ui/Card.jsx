import React from "react";

export default function Card({ className = "", children }) {
  return <div className={`glass ${className}`.trim()}>{children}</div>;
}
