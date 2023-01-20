import {GetDataFromAllPagesReturnType, QueryArguments, QueryTypes} from '../types/getPosts.types';
import {FilteredPost, Post} from '../types/PostResponse';
import {Tag} from '../types/TagsResponse';
import * as _ from 'lodash';

const BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/mengerblog.com';
const POSTS_PER_PAGE = 50;

export async function getAllPosts(): Promise<Array<Post>> {
  const numberOfPages: number = await getNumberOfPages(QueryTypes.Posts).then(number => {
    return number;
  });
  const allPosts = await getDataFromAllPages(numberOfPages, QueryTypes.Posts);
  return allPosts;
}

export async function getPostsByPage(
  pageNumber: number,
  postsPerPage: number,
): Promise<Array<Post>> {
  const posts = await fetch(
    `${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.PerPage}=${postsPerPage}&${QueryArguments.Page}=${pageNumber}`,
  ).then(response => response.json());
  return posts;
}

export async function getAllTags(): Promise<Array<Tag>> {
  const numberOfPages: number = await getNumberOfPages(QueryTypes.Tags);
  const allTags = await getDataFromAllPages(numberOfPages, QueryTypes.Tags);
  return allTags;
}

async function getDataFromAllPages<T extends QueryTypes>(
  pageCount: number,
  queryType: T,
): Promise<GetDataFromAllPagesReturnType[T]> {
  let results: GetDataFromAllPagesReturnType[T] = [];
  for (let i = 0; i < pageCount; i++) {
    await fetch(
      `${BASE_URL}/${queryType}?${QueryArguments.PerPage}=${POSTS_PER_PAGE}&${
        QueryArguments.Page
      }=${i + 1}`,
    )
      .then(response => response.json())
      .then(data => {
        results = [...results, ...data];
      });
  }
  return results;
}

export async function getNumberOfPages(
  queryType: QueryTypes,
  postsPerPage = POSTS_PER_PAGE,
): Promise<number> {
  let numberOfPages: number = 0;
  await fetch(
    `${BASE_URL}/${queryType}?${QueryArguments.PerPage}=${postsPerPage}&${QueryArguments.Page}=1`,
  ).then(response => {
    for (let header of response.headers.entries()) {
      if (header[0] === 'x-wp-totalpages') {
        numberOfPages = parseInt(header[1]);
      }
    }
  });
  return numberOfPages;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.Slug}=${slug}`)
    .then(res => res.json())
    .then((data: Array<Post>) => {
      return data[0];
    });
}

export async function getPostsByTag(tagID: number): Promise<Array<Post>> {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.Tags}=${tagID}`)
    .then(res => res.json())
    .then((data: Array<Post>) => {
      return data;
    });
}

export async function getLandingPagePosts(): Promise<Array<Post>> {
  return await fetch(
    `${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.PerPage}=20&${QueryArguments.Page}=1`,
  )
    .then(res => res.json())
    .then((data: Array<Post>) => {
      return data;
    });
}

export async function getPostBySearchQuery(searchQuery: string) {
  return await fetch(`${BASE_URL}/${QueryTypes.Posts}?${QueryArguments.Search}=${searchQuery}`)
    .then(response => response.json())
    .then((data: Array<Post>) => {
      return data[0];
    });
}

export async function getFilteredPostData(posts: Array<Post>): Promise<Array<FilteredPost>> {
  const fetchedTags = await getAllTags();
  const filteredPosts = _.map(posts, post => {
    const filteredTagData = _.map(post.tags, tag => {
      const tagData = _.filter(fetchedTags, fetchedTag => {
        return fetchedTag.id == tag;
      })[0];
      return {id: tagData.id, name: tagData.name, slug: tagData.slug};
    });
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      jetpack_featured_media_url: post.jetpack_featured_media_url,
      tags: filteredTagData,
    };
  });
  return filteredPosts;
}
