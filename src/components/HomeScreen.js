import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import sanityClient from "../client";
import Loader from "./Loader";

export default function HomeScreen() {
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        "author": author->name, 
        mainImage{
          asset->{
            _id, 
            url
          }, 
          alt
        }, 
        'category': category->title,
      }`
      )
      .then((data) => setArticleData(data.reverse()))
      .catch(console.error);
  }, []);

  if (!articleData) {
    return (
      <>
        <h1 className="text-center my-4">Featured Stories</h1>
        <Loader />
      </>
    );
  }

  return (
    <>
      <h1 className="text-center my-4">Featured Stories</h1>
      <Row>
        {articleData &&
          articleData.map((article) => {
            return (
              <Col key={article.slug.current} sm={12} md={6} lg={4} xl={3}>
                <Link
                  to={`/${article.category}/${article.slug.current}`}
                  className="text-decoration-none"
                >
                  <Card className="mb-4" style={{ minHeight: "30vh" }}>
                    <Card.Img
                      variant="top"
                      src={article.mainImage.asset.url}
                      style={{ height: " 9rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Subtitle className="text-muted ">
                        By: {article.author}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
      </Row>
    </>
  );
}
