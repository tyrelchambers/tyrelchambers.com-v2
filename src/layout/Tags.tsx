import { Tag } from "@/types";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

interface Props {
  tags: Tag[];
  activeTags?: string;
}

const Tags = ({ tags, activeTags }: Props) => {
  const router = useRouter();

  const tagHandler = (tag: string) => {
    const query = router.query;

    if (query.tag === tag) {
      delete router.query.tag;
      router.push({
        query: { ...router.query },
      });
    } else {
      router.push({
        query: { ...router.query, tag },
      });
    }
  };

  return (
    <div className="my-4">
      <ul className="flex gap-4">
        {tags.map((tag) => (
          <li
            key={tag._key}
            className={clsx(
              "border-[1px] border-gray-600 py-1 px-3 rounded-full text-sm",
              activeTags?.includes(tag.value) && "bg-indigo-500 text-white"
            )}
          >
            <button type="button" onClick={() => tagHandler(tag.value)}>
              {tag.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
