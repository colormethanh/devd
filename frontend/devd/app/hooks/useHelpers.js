import React from "react";

export default function useHelpers() {
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));

    return date.toDateString();
  };

  const ellipsifyString = (string, length) => {
    return `${string.slice(0, length - 1)}...`;
  };

  const filterRelevantContents = (contents, relevantContents) => {
    const filteredArray = [];

    if (relevantContents === undefined || !relevantContents)
      return filteredArray;

    const currentContentsId = relevantContents.reduce((prev, cur) => {
      prev.push(cur.content_id);
      return prev;
    }, []);
    contents.forEach((content) => {
      // debugger;
      if (!currentContentsId.includes(content._id)) filteredArray.push(content);
    });
    // debugger;
    return filteredArray;
  };

  return { formatDate, ellipsifyString, filterRelevantContents };
}
