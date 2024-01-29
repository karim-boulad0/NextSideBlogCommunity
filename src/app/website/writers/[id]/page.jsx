"use client";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "next/navigation";
import { Axios } from "@/Api/Axios";
import Writer from "../components/Writer";
import Post from "../../posts/components/Post";
import { PostContext } from "@/context/PostContext";

const WriterPage = () => {
  const { isChange } = useContext(PostContext);
  const [writer, setWriter] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    Axios.get(`website/writers/${id}`)
      .then((res) => setWriter(res.data))
      .catch((err) => console.log(err));
  }, [isChange]);

  return (
    <Container>
      <Row>
        <Col>
          <Writer writer={writer} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Posts</h2>
          {writer?.posts?.map((post) => (
            <Post key={post?.id} post={post} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default WriterPage;
