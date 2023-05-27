export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  coverImg: string;
  body: string;
  views: number;
  tags: { value: string }[];
  _id: string;
  summary: string;
}
