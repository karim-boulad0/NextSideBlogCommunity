"use client";
import { Axios } from "@/Api/Axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Post from "../../posts/components/Post";
import CategoryItem from "../components/CategoryItem";
import { PostContext } from "@/context/PostContext";

export default function Category() {
  const { isChange } = useContext(PostContext);

  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    Axios.get(`/website/categories/${category}`)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.log(err));
  }, [category, isChange]);

  const posts = categoryData?.posts || [];

  return (
    <div className="">
      <div className="w-50">
        <CategoryItem category={categoryData} />
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
