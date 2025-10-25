"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return <div>{params?.necklaceId}
  <div className=" w-10 h-10 bg-black"></div></div>;
}
