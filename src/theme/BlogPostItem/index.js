import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import Giscus from "@giscus/react";

export default function BlogPostItemWrapper(props) {
  return (
    <>
      <BlogPostItem {...props} />
      <Giscus
        repo="chientrm/site"
        repoId="R_kgDOIC8cQg"
        category="Announcements"
        categoryId="DIC_kwDOIC8cQs4CRk7j"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
      />
    </>
  );
}
