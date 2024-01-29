"use client";

import { useState, useEffect, useContext } from "react";
import CategoryItem from "./components/CategoryItem";
import { Axios } from "@/Api/Axios";
import Link from "next/link";
import { WindowContext } from "@/context/WindowContext";
import CustomPagination from "@/components/pagination/CustomPagination";
import { SearchContext } from "@/context/SearchContext";

export default function Categories() {
  const { windowWidth } = useContext(WindowContext);
  const { query } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get(`/website/categories?filter[item]=${query}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, [query]);
  /*------------------------- paginate ---------------------------------*/
  /*-----------------------------------------------------------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = categories.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Categories</h1>

      <div className="row">
        {currentData.map((category) => (
          <div key={category?.id} className="col-lg-3 col-sm-4 col-6 mb-4 ">
            <Link href={`/website/categories/${category.id}`}>
              <CategoryItem category={category} windowWidth={windowWidth} />
            </Link>
          </div>
        ))}
      </div>
      {/* pagination */}
      <CustomPagination
        data={categories}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
