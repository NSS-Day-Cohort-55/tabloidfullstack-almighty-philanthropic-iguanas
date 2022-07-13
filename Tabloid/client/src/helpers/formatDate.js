export const RemoveTimeFromDateTime = (date) => {
  let dateString = date.toString();
  let splitArray = dateString.split("T");
  return splitArray[0];
}

export const PostPublishDateTime = (unformattedDate) => {
  let splitArray = unformattedDate.split("-");
  let year = splitArray[0];
  let month = splitArray[1];
  let day = splitArray[2];
  return `${year}-${month}-${day}T00:00:00.000`;
}

// pass in a C# date to get date back in MDY format
export const formatMDY = (integer) => {
  const date = new Date(Date.parse(integer));
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();
  const formattedDate = month + "/" + day + "/" + year;
  return formattedDate; // returns the date with desired format
};

