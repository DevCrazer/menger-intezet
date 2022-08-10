import { Post } from "../types/PostResponse";

const BASE_URL = "https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts";
const POSTS_PER_PAGE = 100;

export async function getAllPosts() {
  const numberOfPages: number = await getNumberOfPages().then((number) => {
    return number;
  });
  const allPosts = await getPostsFromAllPages(numberOfPages);
  return allPosts;
}

async function getPostsFromAllPages(pageCount: number) {
  let posts: Array<Post> = [];
  for (let i = 0; i < pageCount; i++) {
    await fetch(`${BASE_URL}?per_page=${POSTS_PER_PAGE}&page=${i + 1}`)
      .then((response) => response.json())
      .then((data) => {
        posts = [...posts, ...data];
      });
  }
  return posts;
}

async function getNumberOfPages(): Promise<number> {
  let numberOfPages: number = 0;
  await fetch(`${BASE_URL}?per_page=${POSTS_PER_PAGE}&page=1`).then((response) => {
    for (let header of response.headers.entries()) {
      if (header[0] === "x-wp-totalpages") {
        numberOfPages = parseInt(header[1]);
      }
    }
  });
  return numberOfPages;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return await fetch(`${BASE_URL}?slug=${slug}`)
    .then((res) => res.json())
    .then((data: Array<Post>) => {
      return data[0];
    });
}

export async function getLandingPagePosts(): Promise<Array<Post>> {
  return await fetch(`${BASE_URL}?per_page=20&page=1`)
    .then((res) => res.json())
    .then((data: Array<Post>) => {
      return data;
    });
}

export async function getPostBySearchQuery(searchQuery: string) {
  return await fetch(`${BASE_URL}?search=${searchQuery}`)
    .then((response) => response.json())
    .then((data: Array<Post>) => {
      return data[0];
    });
}
