"use client";
import { Axios } from "@/Api/Axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/context/PostContext";
import Post from "../components/Post";

export default function Page() {
  const [post, setPost] = useState([]);
  const { isChange } = useContext(PostContext);
  const { id } = useParams();
  useEffect(() => {
    Axios.get(`/website/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [isChange]);
  return (
    <div className="">
      <Post key={post.id} post={post[0]} />
    </div>
  );
}
