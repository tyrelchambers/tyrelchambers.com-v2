import { TypedObject } from "@sanity/types";
export interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  coverImg: string;
  content: string;
  views: number;
  tags: { value: string }[];
  _id: string;
  summary: string;
}
