import React from "react";

export default function ToolListings(props) {
  if (!props.list.list) return console.log("list not found");
  return (
    <li>
      <p>{props.list.list}</p>
    </li>
  );
}
