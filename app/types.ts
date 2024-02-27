export interface Tag {
  _type: string;
  _key: string;
  label: string;
  value: string;
}

export interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  coverImg: string;
  content: string;
  views: number;
  tags: Tag[];
  _id: string;
  summary: string;
}
