"use client";

import { Axios } from "@/Api/Axios";
import { useEffect, useState } from "react";
import Writer from "./components/Writer";

export default function Workers() {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    Axios.get("/website/writers")
      .then((res) => setWriters(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {writers.map((writer) => (
        <Writer key={writer.id} writer={writer} />
      ))}
    </div>
  );
}
