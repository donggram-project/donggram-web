import styled from "@emotion/styled";

interface CategoryButtonProps {
  isClicked: boolean;
  field: string;
}

export const CategoryButtonCss = styled.div<CategoryButtonProps>`
  display: inline-flex;
  justify-content: center;
  place-items: center;
  height: 2.7rem;
  padding: 0.4rem 1rem;
  border-radius: 1.2rem;
  margin-left: 0.4rem;
  margin-top: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.isClicked
      ? props.field === "division"
        ? "#B0C4DE"
        : "#0090F9"
      : "#F2F4F8"};
  color: ${(props) => (props.isClicked ? "white" : "black")};
  font-family: ${(props) =>
    props.field === "division" ? "Arial, sans-serif" : "inherit"};
  font-weight: ${(props) => (props.field === "division" ? "bold" : "normal")};
`;

export const CategoryButtonTextCss = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 140%;
`;
