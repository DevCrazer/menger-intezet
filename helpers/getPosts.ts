import { GetDataFromAllPagesReturnType, QueryArguments, QueryTypes } from "../types/getPosts.types";
import { Post } from "../types/PostResponse";
import { Tag } from "../types/TagsResponse";

const BASE_URL = "https://public-api.wordpress.com/wp/v2/sites/mengerblog.com";
const POSTS_PER_PAGE = 50;

export async function getAllPosts(): Promise<Array<Post>> {
  const numberOfPages: number = await getNumberOfPages(QueryTypes.Posts).then((number) => {
    return number;
  });
  const allPosts = await getDataFromAllPages(numberOfPages, QueryTypes.Posts);
  return allPosts;
}

export async function getAllTags(): Promise<Array<Tag>>  {
  const numberOfPages: number = await getNumberOfPages(QueryTypes.Tags).then((number) => {
    return number;
  });
  const allTags = await getDataFromAllPages(numberOfPages, QueryTypes.Tags);
  return allTags;
}

async function getDataFromAllPages<T extends QueryTypes>(pageCount: number, queryType: T): Promise<GetDataFromAllPagesReturnType[T]> {
  let results: GetDataFromAllPagesReturnType[T] = [];
  for (let i = 0; i < pageCount; i++) {
    await fetch(`${BASE_URL}/${queryType}?${QueryArguments.PerPage}=${POSTS_PER_PAGE}&${QueryArguments.Page}=${i + 1}`)
      .then((response) => response.json())
      .then((data) => {
        results = [...results, ...data];
      });
  }
  return results;
}

async function getNumberOfPages(queryType: QueryTypes): Promise<number> {
  let numberOfPages: number = 0;
  await fetch(`${BASE_URL}/${queryType}?${QueryArguments.PerPage}=${POSTS_PER_PAGE}&${QueryArguments.Page}=1`).then((response) => {
    for (let header of response.headers.entries()) {
      if (header[0] === "x-wp-totalpages") {
        numberOfPages = parseInt(header[1]);
      }
    }
  });
  return numberOfPages;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.Slug}=${slug}`)
    .then((res) => res.json())
    .then((data: Array<Post>) => {
      return data[0];
    });
}

export async function getPostsByTag(tagID: number): Promise<Array<Post>> {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.Tags}=${tagID}`)
    .then((res) => res.json())
    .then((data: Array<Post>) => {
      return data;
    });
}

export async function getLandingPagePosts(): Promise<Array<Post>> {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.PerPage}=20&${QueryArguments.Page}=1`)
    .then((res) => res.json())
    .then((data: Array<Post>) => {
      return data;
    });
}

export async function getPostBySearchQuery(searchQuery: string) {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.Search}=${searchQuery}`)
    .then((response) => response.json())
    .then((data: Array<Post>) => {
      return data[0];
    });
}
