//관리자 페이지에서 사용하는 전공 선택 컴포넌트

import { useState, useCallback, useEffect } from "react";
import x from "@public/x.svg";
import under from "@public/under2.svg";
import {
  SelectBox,
  SelectedBox,
  FilterImage,
  Options,
  Option,
  MajorBox,
  XImage,
} from "./AdminMajorSelector.styled";

interface MajorSelectorProps {
  major: string;
  major2: string;
  onMajorChange: (major: string) => void;
  onMajor2Change: (major2: string) => void;
}

export const AdminMajorSelector = ({
  major,
  major2,
  onMajorChange,
  onMajor2Change,
}: MajorSelectorProps) => {
  const [majors, setMajors] = useState<string[]>([]);
  const [selected, setSelected] = useState([major, major2]);
  const [showOptions, setShowOptions] = useState(false);
  const BoxClick = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  useEffect(() => setSelected([major, major2]), [major, major2]);

  const handleSetSelectedOption = useCallback(
    (e: React.MouseEvent) => {
      const { innerText } = e.target as HTMLElement;
      if (major !== "" && major2 !== "") {
        alert("최대 2개의 전공을 선택할 수 있습니다.");
        return;
      } else if (major === innerText || major2 === innerText) {
        alert("중복된 전공을 선택하였습니다.");
        return;
      }
      const newSelected = selected;
      if (newSelected[0] === "" && newSelected[1] === "") {
        newSelected[0] = innerText;
        onMajorChange(innerText);
      } else if (newSelected[0] === "") {
        newSelected[0] = innerText;
        onMajorChange(innerText);
      } else {
        newSelected[1] === innerText;
        onMajor2Change(innerText);
      }
      setSelected(newSelected);
    },
    [onMajorChange, onMajor2Change, selected, major, major2]
  );

  const handleDeleteSelectedOption = useCallback(
    (selectedMajor: string) => {
      if (major === selectedMajor) {
        onMajorChange("");
      } else if (major2 === selectedMajor) {
        onMajor2Change("");
      }
    },
    [major, major2, onMajorChange, onMajor2Change]
  );

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const data: { default: string[] } = await import(
          `@/data/onlymajor.json`
        );
        setMajors(data.default);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchMajors();
  }, []);

  return (
    <SelectBox show={showOptions}>
      <SelectedBox>
        <FilterImage src={under} alt="filter" onClick={BoxClick} />
        {major && (
          <MajorBox>
            {major}
            <XImage
              src={x}
              alt="delete"
              onClick={() => handleDeleteSelectedOption(major)}
            />
          </MajorBox>
        )}
        {major2 && (
          <MajorBox>
            {major2}
            <XImage
              src={x}
              alt="delete"
              onClick={() => handleDeleteSelectedOption(major2)}
            />
          </MajorBox>
        )}
      </SelectedBox>
      <Options show={showOptions} onClick={BoxClick}>
        {majors.map((major, index) => (
          <Option onClick={handleSetSelectedOption} key={index}>
            {major}
          </Option>
        ))}
      </Options>
    </SelectBox>
  );
};
