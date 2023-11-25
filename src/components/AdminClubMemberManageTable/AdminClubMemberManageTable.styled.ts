import styled from "@emotion/styled";

export const ClubName = styled.div`
  font-size: 3.6rem;
  font-weight: 600;
`;
export const Table = styled.div`
  margin-top: 2.1rem;
  z-index: auto;
  width: 58rem;
`;

export const TableContent = styled.div`
  justify-content: space-between;
  border-bottom: 0.5px solid #959a9f;
`;
export const TableRow = styled.div<{ clicked?: boolean }>`
  display: flex;
  justify-content: space-between; // 변경된 부분
  align-items: center;
  height: 4.6rem;
  border: 0.5px solid #959a9f;
  border-bottom: none;
  flex-wrap: nowrap;
  cursor: pointer;
  color: ${(props) => (props.clicked ? "white" : "black")};
  background: ${(props) => (props.clicked ? "#0090f9" : "white")};
`;
export const TableText = styled.div<{ isId?: boolean }>`
  flex: 1;
  font-size: 1.5rem;
  line-height: 110%;
  text-align: center;
`;
export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  height: 4.6rem;
  background: #dde1e6;
  margin-bottom: 1rem;
  justify-content: space-between;
`;
export const TitleRow = styled.div`
  flex: 1;
  font-size: 1.8rem;
  line-height: 110%;
  text-align: center;
`;
export const PageTab = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const CompleteButtons = styled.div`
  flex: 1;
`;
export const Cancle = styled.button`
  width: 4.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #dde1e6;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  &:hover {
    box-shadow: 0.1rem 0.1rem 0.3rem 0.1rem #dadce0 inset;
  }
  &:active {
    box-shadow: 0.2rem 0.2rem 0.3rem 0.2rem #dadce0 inset;
  }
`;
export const Save = styled(Cancle)`
  margin-left: 0.3rem;
  border: 1px solid #0090f9;
  background: #0090f9;
  color: white;
  &:hover {
    box-shadow: 0.1rem 0.1rem 0.3rem 0.1rem #0076d7 inset;
  }
  &:active {
    box-shadow: 0.2rem 0.2rem 0.3rem 0.2rem #0076d7 inset;
  }
`;

export const Container = styled.div``;
