export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const BLOG_URL = `${APP_URL}/posts`;
export const POST_URL = (slug: string) => `${APP_URL}/posts/${slug}`;
