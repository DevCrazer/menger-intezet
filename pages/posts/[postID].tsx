import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

export default function SinglePost() {
  const router = useRouter();
  const { postID } = router.query;
  return (
    <Layout>
      <div>{postID}</div>
    </Layout>
  );
}
