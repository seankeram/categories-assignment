"use client";

import { getCategories } from "@/api/services/categories";
import CategoryItem from "@/components/CategoryItem";
import useDebounce from "@/hooks/useDebounce";
import { CategoryItemT } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
  });

  const searchedValue = useDebounce(search, 1000);

  const [filteredData, setFilteredData] = useState(data?.data?.data);

  const handleSearch: any = useCallback(
    (data: CategoryItemT, query: string) => {
      if (!data) {
        return false;
      }
      if ("name" in data && data.name.includes(query)) {
        return true;
      }

      return data.children.find((item: CategoryItemT) =>
        handleSearch(item, query)
      );
    },
    []
  );

  useEffect(() => {
    if (!!searchedValue && data?.data?.data?.length > 0) {
      const res = data?.data?.data?.filter((node: CategoryItemT) => {
        return handleSearch(node, searchedValue);
      });
      setFilteredData(res);
    }
  }, [searchedValue]);

  return (
    <div className="bg-white w-full py-10">
      <input
        className="flex-1 border border-gray-600 rounded-lg w-[80%] mx-auto block p-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search something...."
      />

      {isLoading && <div className="text-center mt-5">Loading ...!</div>}

      {!!searchedValue ? (
        filteredData?.length > 0 ? (
          filteredData?.map((item: CategoryItemT) => (
            <CategoryItem {...item} key={item?.id} />
          ))
        ) : (
          <div className="text-red-500 font-bold text-center my-5 text-2xl">
            Not Found ..!
          </div>
        )
      ) : (
        data?.data?.data?.map((item: CategoryItemT) => (
          <CategoryItem {...item} key={item?.id} />
        ))
      )}
    </div>
  );
}
