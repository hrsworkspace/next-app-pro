import { fetchGraphQL } from "./contentful";

export async function getSliderImageURL() {
  const entries = await fetchGraphQL(
    `query {
      sliderCollection{
        items{
          sliderUrl
        }
      }
      }`
  );
  return entries?.data?.sliderCollection?.items;
}
