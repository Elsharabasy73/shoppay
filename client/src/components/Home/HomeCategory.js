import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../common/SubTitle";
import CategoryCard from "./../Category/CategoryCard";
import HomeCategoryHook from "../../hooks/category/home-category-hook";

const HomeCategory = () => {
  const [category, loading, colors] = HomeCategoryHook();

  return (
    <Container>
      <SubTitle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {loading === false ? (
          category ? (
            category.data.slice(0, 5).map((item, index) => {
            //   console.log(item);
              return (
                <CategoryCard
                  key={index}
                  id={item._id}
                  title={item.name}
                  img={item.image}
                  background={colors[index]}
                />
              );
            })
          ) : (
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
