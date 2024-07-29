import React from "react";
import { getSliderImageURL } from "@/contentful/contentfulHome";
import HomePage from "./home/page";

async function getcontent() {
  return await getSliderImageURL();
}

export default async function Home() {
  const details = await getcontent();
  return <HomePage details={details} />;
}
