"use client";

import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Button, Modal, Table, Pagination } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import CustomPagination from "@/components/pagination/CustomPagination";
export default function Users() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isGet, setIsGet] = useState(false);
  const [isDelete, setIsDelete] = useState(1);
  const { isDark } = useContext(ThemeContext);
  const [Auth, setAuth] = useState([]);
  const [isGetAuth, setIsGetAuth] = useState(false);
  const Header = [
    {
      key: "name",
      name: "name",
    },
    {
      key: "email",
      name: "email",
    },
    {
      key: "status",
      name: "status",
    },
    {
      key: "photo",
      name: "photo",
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
        <h3>no users found</h3>
      </td>
    </tr>
  );

  //get current user
  useEffect(() => {
    Axios.get("/global/auth")
      .then((response) => {
        setIsGetAuth(true);
        setAuth(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // get users
  useEffect(() => {
    Axios.get(`/dashboard/users?filter[item]=${query}`)
      .then((response) => {
        setUsers(response.data);
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
  const currentData = users.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination
  /*------------------------- Delete modal---------------------------------*/
  /*-----------------------------------------------------------------------*/
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDeleteId(id);
  };
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
          }}
        >
          are you sure you wanna delete this User
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

  function handleDelete() {
    handleClose();
    try {
      Axios.delete(`/dashboard/users/${deleteId}`);
      setIsDelete((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-100 ">
      <div className="d-flex justify-content-around mb-3">
        <h1>Users</h1>
        <input
          type="text"
          className="form-control w-50 h-25 mt-2"
          placeholder="Search users..."
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
          {users.length === 0 && !isGet
            ? tr
            : users.length === 0 && isGet
            ? trTwo
            : currentData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  {Header.map((item1, index) => {
                    const i = item1.key;
                    return (
                      <td key={index}>
                        {i === "photo" ? (
                          <Image
                            src={item[i] ? item[i] : "http://127.0.0.1"}
                            width={55}
                            height={55}
                            alt="none photo"
                          />
                        ) : (
                          item[i]
                        )}
                      </td>
                    );
                  })}
                  <td className="">
                    <div className="d-flex align-items-center gap-2">
                      {/* edit  */}
                      <Link href={`users/${item.id}`} className="mr-2">
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </Link>
                      {/* delete */}
                      {isGetAuth && item.id !== Auth.id && (
                        <FontAwesomeIcon
                          className="text-danger "
                          icon={faTrashCan}
                          cursor={"pointer"}
                          onClick={() => handleShow(item.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      {/* delete modal */}
      {DeleteModal}
      {/* pagination */}
      <CustomPagination
        data={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
