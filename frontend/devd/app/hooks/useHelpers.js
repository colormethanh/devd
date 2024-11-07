import React from "react";

export default function useHelpers() {
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));

    return date.toDateString();
  };

  return { formatDate };
}
