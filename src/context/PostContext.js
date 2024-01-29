"use client";

import { createContext, useState } from "react";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [isChange, setIsChange] = useState(1);

  return (
    <PostContext.Provider value={{ isChange, setIsChange }}>
      {children}
    </PostContext.Provider>
  );
};
