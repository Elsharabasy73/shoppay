import React, { useEffect } from "react";
import SubTitle from "../common/SubTitle";
import CategoryCard from "./../Category/CategoryCard";
import HomeCategoryHook from "../../hooks/category/home-category-hook";
import TwSpinner from "../common/TwSpinner";

const HomeCategory = () => {
  const [category, loading, colors] = HomeCategoryHook();

  return (
    <div className="max-w-[1400px] mx-auto px-5">
      <SubTitle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <div className="my-2 flex flex-wrap justify-between">
        {loading === false ? (
          category && category.data && Array.isArray(category.data) && category.data.length > 0 ? (
            category.data.slice(0, 5).map((item, index) => {
              return (
                <CategoryCard
                  key={item._id || index}
                  id={item._id}
                  title={item.name}
                  img={item.image}
                  background={colors[index % colors.length]}
                />
              );
            })
          ) : (
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          <TwSpinner />
        )}
      </div>
    </div>
  );
};

export default HomeCategory;
