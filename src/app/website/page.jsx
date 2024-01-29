"use client";
import { Axios } from "@/Api/Axios";
import FeaturedCategories from "@/components/webSite/FeaturedCategories/FeaturedCategories";
import Slider from "@/components/webSite/Slider/Slider";
import { useContext, useEffect, useState } from "react";
import Post from "./posts/components/Post";
import { PostContext } from "@/context/PostContext";
import { SearchContext } from "@/context/SearchContext";

export default function Website() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isChange } = useContext(PostContext);
  const { query } = useContext(SearchContext);

  useEffect(() => {
    Axios.get(`/website/categories?filter[item]=${query}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, [query]);
  useEffect(() => {
    Axios.get("/website/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [isChange]);
  return (
    <div>
      <FeaturedCategories categories={categories} />
      <Slider posts={posts} />
      {/* <DropDownNotifications /> */}
      {posts.slice(0, 7).map((post) => (
        <Post key={post?.id} post={post} />
      ))}
    </div>
  );
}
