"use client";
import React, { memo } from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-96 w-screen">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" 
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default memo(Loading);
