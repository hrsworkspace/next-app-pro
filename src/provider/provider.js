"use client";
import store from "@/store/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function AppProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient && <Provider store={store}>{children}</Provider>}</>;
}
