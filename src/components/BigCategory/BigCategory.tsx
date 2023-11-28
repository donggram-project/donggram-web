//카테코리 컴포넌트 (대)
import { useState } from "react";
import { CategoryButtonCss, CategoryButtonTextCss } from "./BigCategory.styled";

interface CategoryProps {
  props: string;
  onCategoryClick: (id: string) => void;
  field: string;
}

export function BigCategory({ props, onCategoryClick, field }: CategoryProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onCategoryClick(props);
  };

  return (
    <CategoryButtonCss
      isClicked={isClicked}
      onClick={handleClick}
      field={field}
    >
      <CategoryButtonTextCss>{props}</CategoryButtonTextCss>
    </CategoryButtonCss>
  );
}
