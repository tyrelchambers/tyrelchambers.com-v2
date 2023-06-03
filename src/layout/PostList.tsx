import { Post } from "@/types";
import { faCalendar, faEye } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <div>
      <ul className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
        {posts.map((post) => (
          <li
            key={post._id}
            className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-3 post-list-item"
          >
            <div className="flex flex-col flex-1 gap-3">
              <div className="w-full h-[150px] overflow-hidden rounded-xl mb-4 shadow-lg flex items-center">
                <Image src={post.coverImg} alt="" />
              </div>
              <Title order={3} className="text-white" weight={500}>
                {post.title}
              </Title>
              <p className="text-neutral-400">{post.summary}</p>
            </div>

            <footer className="flex justify-between md:items-end flex-col-reverse lg:flex-row md:mt-4">
              <div className="flex gap-6 mt-4 sm:mt-0">
                <div className="flex text-neutral-500 gap-2 items-center">
                  <FontAwesomeIcon icon={faEye} />
                  <p className="text-neutral-400">{post.views}</p>
                </div>

                <div className="flex text-neutral-500 gap-2 items-center">
                  <FontAwesomeIcon icon={faCalendar} />
                  <p className="text-neutral-400">{post.publishedAt}</p>
                </div>
              </div>
              <Link
                href={`/post/${post.slug.current}`}
                className="rounded-xl px-6 py-2 border-2 border-indigo-500 text-white font-medium text-center shadow-xl mt-8 hover:bg-indigo-500 self-end w-full sm:w-fit"
              >
                View
              </Link>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
