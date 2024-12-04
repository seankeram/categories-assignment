import { CategoryItemT } from "@/types/Category";
import { useState } from "react";

const CategoryItem = (data: CategoryItemT) => {
  const [displayChildren, setDisplayChildren] = useState(false);
  const { children, name } = data;
  const toggleShow = () => setDisplayChildren((prev) => !prev);

  return (
    <div>
      <div
        onClick={toggleShow}
        className={`text-center py-3  w-fit mx-auto px-5 rounded-lg my-2`}
      >
        {name || ""} {children?.length > 0 && "+"}
      </div>
      <div className="bg-gray-300/60 px-10">
        {children?.length > 0 &&
          displayChildren &&
          children?.map((item) => <CategoryItem key={item?.id} {...item} />)}
      </div>
    </div>
  );
};

export default CategoryItem;
