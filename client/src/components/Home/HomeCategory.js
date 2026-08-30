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
      <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {loading === false ? (
          category && category.data && Array.isArray(category.data) && category.data.length > 0 ? (
            category.data.slice(0, 6).map((item, index) => { // slice 0 to 6 instead of 5 to fit grid layouts nicely
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
          <div className="col-span-full flex justify-center"><TwSpinner /></div>
        )}
      </div>
    </div>
  );
};

export default HomeCategory;
