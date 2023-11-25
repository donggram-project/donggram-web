//카테고리 배열
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BigCategory } from "@components/BigCategory/BigCategory";
import { CategoryContainer } from "./Categories.styled";
import { customAxios } from "@/Utils/customAxios";

interface CategoryProps {
  props: string;
  isClicked: boolean;
  [key: string]: any;
}

interface filePath {
  filePath: string;
  fieldName: string;
  clickedIds: number[];
  setClickedIds: Dispatch<SetStateAction<number[]>>;
  setAll: Dispatch<SetStateAction<number[]>>;
}

function Categories({
  filePath,
  fieldName,
  clickedIds,
  setClickedIds,
  setAll,
}: filePath) {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    customAxios
      .get(`${filePath}`)
      .then((response) => {
        const data = response.data.data;
        setCategories(data);
        setAll(extractIds(data, fieldName));
      })
      .catch((error) => {});
  }, [filePath, setAll, fieldName]);

  function extractIds(data: any, type: string) {
    return data.map((item: any) => {
      if (type === "college") {
        return item.collegeId;
      } else if (type === "division") {
        return item.divisionId;
      }
    });
  }

  const handleCategoryClick = (id: number) => {
    var NewIds = [...clickedIds];
    if (NewIds.includes(id)) {
      NewIds = NewIds.filter((data) => data !== id);
    } else {
      NewIds.push(id);
    }
    NewIds.sort();
    setClickedIds(NewIds);
  };

  return (
    <CategoryContainer>
      {categories.map((category, index) => (
        <BigCategory
          key={index}
          props={category[fieldName + "Name"]}
          onCategoryClick={() =>
            handleCategoryClick(category[fieldName + "Id"])
          }
        />
      ))}
    </CategoryContainer>
  );
}

export default Categories;
