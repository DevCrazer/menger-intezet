export interface PostListElementProps {
  post: Post;
  displayImages: boolean;
}

export interface Post {
  author: string;
  image: string;
  excerpt: string;
  title: string;
}
