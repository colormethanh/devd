import React from "react";

export default function useHelpers() {
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));

    return date.toDateString();
  };

  const ellipsifyString = (string, length) => {
    return `${string.slice(0, length - 1)}...`;
  };

  return { formatDate, ellipsifyString };
}
