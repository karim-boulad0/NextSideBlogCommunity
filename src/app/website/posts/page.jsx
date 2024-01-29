"use client";
import { useContext, useEffect, useState } from "react";
import Post from "./components/Post";
import { Axios } from "@/Api/Axios";
import { PostContext } from "@/context/PostContext";
import CustomPagination from "@/components/pagination/CustomPagination";
import { SearchContext } from "@/context/SearchContext";

export default function Posts() {
  const { isChange } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const { query } = useContext(SearchContext);

  useEffect(() => {
    Axios.get(`/website/posts?filter[item]=${query}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [isChange, query]);
  /*------------------------- paginate ---------------------------------*/
  /*-----------------------------------------------------------------------*/
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = posts.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination
  return (
    <div>
      <div className="text-center mt-2">
        <h1>News</h1>
      </div>
      {currentData.map((post) => (
        <Post key={post?.id} post={post} />
      ))}
      <CustomPagination
        data={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
