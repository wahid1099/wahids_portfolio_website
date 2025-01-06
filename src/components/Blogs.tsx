"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import useArticles from "@/hooks/lib/get-articles";
import RenderRichText from "@/app/utils/render-richt-text";
import Loading from "./Loading";

export const Blogs = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const { data: blogs, isLoading } = useArticles();

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto my-10">
      {blogs?.map((blog, index) => (
        <motion.div
          key={blog._id}
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
        >
          <Link
            key={`blog-${blog.title}`}
            href={`/blog/${blog._id}`}
            className="relative my-10 block"
            onMouseEnter={() => setHovered(blog._id)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence mode="wait">
              {hovered === blog._id && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scaleX: 0.95,
                    scaleY: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scaleX: 1.05,
                    scaleY: 1.2,
                  }}
                  exit={{
                    opacity: 0,

                    scaleX: 0.95,
                    scaleY: 0.95,
                  }}
                  className="absolute z-0 pointer-events-none bg-gray-50 inset-0 h-full w-full   rounded-md "
                />
              )}
            </AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-20">
              <Image
                src={blog.image}
                alt="thumbnail"
                height={159}
                width={200}
                className="rounded-md w-full md:w-[200px] md:object-cover"
              />
              <div className="flex flex-col col-span-3">
                <Heading className="text-lg md:text-lg lg:text-lg">
                  {blog.title}
                </Heading>
                <Paragraph className="text-sm md:text-sm lg:text-sm mt-2">
                  <RenderRichText text={blog.description.slice(0, 250)} />
                </Paragraph>
                <div className="flex space-x-2 flex-wrap mt-4">
                  {blog.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-1 py-0.5 text-secondary border border-neutral-200 bg-white rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
