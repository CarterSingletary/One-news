import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import sanityClient from "../client";
import Loader from "./Loader";

export default function CategoryPage() {
  const [articleData, setArticleData] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[category->title == '${category}']{
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
  }, [category]);

  if (!articleData) {
    return (
      <>
        <h1 className="text-center my-4">{category}</h1>
        <Loader />
      </>
    );
  } else if (articleData.length === 0) {
    return (
      <>
        <h1 className="text-center my-4">{category}</h1>
        <h5 className="text-center mb-4 text-muted">No Articles Yet</h5>
        <Link
          to="/"
          className="row justify-content-center text-decoration-none"
        >
          <Button>Back Home</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center my-4">{category}</h1>
      <Row>
        {articleData &&
          articleData.map((article) => {
            return (
              <Col key={article.slug.current} sm={12} md={6} lg={4} xl={3}>
                <Link to={`/${article.category}/${article.slug.current}`}>
                  <Card className="mb-4">
                    <Card.Img
                      variant="top"
                      src={article.mainImage.asset.url}
                      style={{ height: " 9rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Subtitle className="text-muted">
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
