import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import sanityClient from "../client";
import Loader from "./Loader";
import BlockContent from "@sanity/block-content-to-react";

export default function ArticlePage() {
  const [articleData, setArticleData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == '${slug}']{
        title,
        slug,
        "author": author->name, 
        "bio": author->bio,
        mainImage{
          asset->{
            _id, 
            url
          }, 
          alt
        }, 
        body
      }`
      )
      .then((data) => setArticleData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!articleData) {
    return <Loader />;
  }

  return (
    <>
      <Card className="my-3">
        <h1 className="mt-4 text-center mx-3">{articleData.title}</h1>
        <p className="text-center text-muted">By: {articleData.author}</p>

        <div className="row justify-content-center">
          <Image
            src={articleData.mainImage.asset.url}
            variant="bottom"
            style={{ maxHeight: "42vw", maxWidth: "52vw" }}
          />
        </div>
        <BlockContent
          blocks={articleData.body}
          projectId="tn3zufrg"
          dataset="production"
          className="mx-4 my-3"
        />
        <Card.Footer>
          <h5>{articleData.author}</h5>
          <p className="text-muted">About the author:</p>
          <p>{articleData.bio[0].children[0].text}</p>
        </Card.Footer>
      </Card>
    </>
  );
}
