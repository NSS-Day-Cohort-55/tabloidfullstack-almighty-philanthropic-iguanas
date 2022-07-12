import React from "react";

export const RemoveTimeFromDateTime = (date) => {
    let dateString = date.toString();
    let splitArray = dateString.split("T");
    return splitArray[0];
}