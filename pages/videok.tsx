/* eslint-disable react/no-unknown-property */
import React from "react";
import Layout from "../components/Layout";

export default function Videos() {
  return (
    <Layout>
      <div>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/videoseries?list=UUR9ZpmR-YA-XRjhx2NRTJVw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
}
