"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Pagination, Table } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import CustomPagination from "@/components/pagination/CustomPagination";
export default function Posts() {
  const [query, setQuery] = useState("");

  const [posts, setPosts] = useState([]);
  const [isGet, setIsGet] = useState(false);
  const [isDelete, setIsDelete] = useState(1);
  const { isDark } = useContext(ThemeContext);
  // header's table
  const Header = [
    {
      key: "title",
      name: "title",
    },
    {
      key: "content",
      name: "content",
    },
    {
      key: "category_title",
      name: "category_title",
    },
    {
      key: "image",
      name: "image",
    },
    {
      key: "user_name",
      name: "user_name",
    },
    {
      key: "user_email",
      name: "user_email",
    },
    {
      key: "tags",
      name: "tags",
    },
    {
      key: "smallDesc",
      name: "smallDesc",
    },
    {
      key: "likes_count",
      name: "likes_count",
    },
    {
      key: "dislikes_count",
      name: "dislikes_count",
    },
    {
      key: "comments_count",
      name: "comments_count",
    },
  ];
  const headerShow = Header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));
  // make tr in variable
  const tr = (
    <tr className="text-center">
      <td colSpan={12}>
        <h3>loading...</h3>
      </td>
    </tr>
  );
  // make tr in variable
  const trTwo = (
    <tr className="text-center">
      <td colSpan={12}>
        <h3>no posts found</h3>
      </td>
    </tr>
  );
  // get posts
  useEffect(() => {
    Axios.get(`/dashboard/posts?filter[item]=${query}`)
      .then((response) => {
        setPosts(response.data);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [isDelete, query]);
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
  /*------------------------- handle Delete modal---------------------------------*/
  /*-----------------------------------------------------------------------*/
  const [deleteId, setDeleteId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDeleteId(id);
  };
  // handle delete
  function handleDelete() {
    try {
      handleClose();
      Axios.delete(`/dashboard/posts/${deleteId}`);
      setIsDelete((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  }
  const DeleteModal = (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
          }}
        >
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
          }}
        >
          are you sure you wanna delete this category
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
          }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  return (
    <div className="w-100 ">
      <div className="d-flex justify-content-around mb-3">
        <h1>Posts</h1>
        <input
          type="text"
          className="form-control w-50 h-25 mt-2"
          placeholder="Search Posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Table bordered className="w-100" variant={!isDark ? "dark" : undefined}>
        <thead>
          <tr>
            <th>#</th>
            {headerShow}
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && !isGet
            ? tr
            : posts.length === 0 && isGet
            ? trTwo
            : currentData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {Header.map((item1, index) => {
                    const i = item1.key;
                    return (
                      <td key={index}>
                        {i === "image" ? (
                          <Image
                            src={`${item[i]}`}
                            width={55}
                            height={55}
                            alt="none"
                          />
                        ) : (
                          item[i]
                        )}
                      </td>
                    );
                  })}
                  <td className="">
                    <div className="d-flex align-items-center gap-2">
                      <Link href={`/dashboard/posts/${item.id}`}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </Link>
                      <FontAwesomeIcon
                        className="text-danger "
                        icon={faTrashCan}
                        cursor={"pointer"}
                        onClick={() => handleShow(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      {/* pagination */}
      <CustomPagination
        data={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      {DeleteModal}
    </div>
  );
}
