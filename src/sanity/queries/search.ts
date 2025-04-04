import { groq } from "next-sanity";
export const titleQuery = `title`;
export const bodyQuery = `body[].children[].text`;
const searchQueries = [
  titleQuery,
  bodyQuery,
];

const query = {
  keyword: groq`
  {
   "results": *[ _type in [
        "page",
        "post",
      ] &&
      (${searchQueries.map((type) => {
    return `${type} match "*" + $queryString + "*"`;
  }).join(" || ")})
    ]{
      _type,
      title,
      description,
      "slug": slug.current,
    }[$start..$end],
    "total": count(*[ _type in [
        "page",
        "post",
      ] &&
      (${searchQueries.map((type) => {
    return `${type} match "*" + $queryString + "*"`;
  }).join(" || ")})
    ])
  }`
};

export default query;
