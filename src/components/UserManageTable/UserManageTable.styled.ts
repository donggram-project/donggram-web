import styled from "@emotion/styled";

export const Table = styled.div`
  margin-top: 2.1rem;
  z-index: auto;
`;

export const TableContent = styled.div`
  border-bottom: 0.5px solid #959a9f;
  width: 86rem;
`;
export const TableRow = styled.div<{ clicked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 86rem;
  height: 4.6rem;
  border: 0.5px solid #959a9f;
  border-bottom: none;
  flex-wrap: nowrap;
  cursor: pointer;
  color: ${(props) => (props.clicked ? "white" : "black")};
  background: ${(props) => (props.clicked ? "#0090f9" : "white")};
`;
export const TableText = styled.div<{ isId?: boolean }>`
  font-size: 1.8rem;
  line-height: 110%;
  flex: ${(props) => (props.isId ? 0.5 : 1)};
  text-align: center;
`;
export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  width: 86rem;
  height: 4.6rem;
  gap: 48px;
  align-self: stretch;
  background: #dde1e6;
  margin-bottom: 2.15rem;
  flex: 1;
`;
export const TitleRow = styled.div<{ isId?: boolean }>`
  font-size: 1.8rem;
  line-height: 110%;
  flex: ${(props) => (props.isId ? 0.5 : 1)};
  text-align: center;
`;
export const PageTab = styled.div`
  margin-top: 15.8rem;
  display: flex;
  width: 86rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 1.6rem;
`;
export const NumberButton = styled.button`
  display: flex;
  justify-content: center;
  height: 4rem;
  width: 4.2rem;
  padding: 0.8rem;
  color: #0f62fe;
`;
export const ActiveNumberButton = styled(NumberButton)`
  font-weight: 500;
  background-color: #a6c8ff;
  color: #001d6c;
`;
export const ShiftButton = styled.button`
  color: #0f62fe;
  height: 4rem;
  padding: 0.8rem;
`;
export const DisabledShiftButton = styled(ShiftButton)`
  color: #697077;
  cursor: default;
`;
export const SearchLine = styled.div`
  display: flex;
  gap: 2.1rem;
  align-items: center;
  margin-bottom: -0.8rem;
`;
export const Container = styled.div``;
