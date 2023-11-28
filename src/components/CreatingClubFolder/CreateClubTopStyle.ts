import styled from "styled-components";
import Image from "next/image";

export const TopBorder = styled.div`
  border: 0.1rem solid #000;
  width: 740px; //수정해야함
  height: 0;
  transform: rotate(0.066deg);
  flex-shrink: 0;
`;
export const BotBorder = styled(TopBorder)`
  border: 0.1rem solid #959a9f;
  margin-bottom: 5.5rem;
`;
export const CreatingClubText = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 44.8px */
  width: 19.8rem;
  height: 4.3rem;
  flex-shrink: 0;
`;
export const EssentialText = styled.div`
  width: 15.8rem;
  height: 2.5rem;
  flex-shrink: 0;
  color: #fe2a2a;
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 1.2rem;
`;
export const ClubImageText = styled.div`
  width: 15.7rem;
  height: 3.1rem;
  flex-shrink: 0;
  color: #000;
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
export const Star = styled.span`
  color: #fe2a2a;
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
export const ClubImage = styled(Image)`
  margin-left: 5rem;
  width: 20rem;
  height: 23rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;
export const ClubImageCss = styled.img`
  margin-left: 5rem;
  width: 20rem;
  height: 23rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;
export const OptimizeText = styled.div`
  color: #4aa4ff;
  font-family: Roboto;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  margin-left: 20.5rem;
  margin-top: 3rem;
  margin-bottom: 7rem;
`;
export const TopTextContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-bottom: 1rem;
`;
export const ImageNTextConatiner = styled.div`
  display: flex;
  margin-top: 5rem;
`;
export const PageContainer = styled.div`
  margin-left: -3.8rem;
`;
export const ImageUpLoad = styled.div`
  justify-content: center;
  display: flex;
  margin-left: 64rem;
  margin-top: 2rem;
  font-size: 1.2rem;
`;
export const ImageDelete = styled.div`
  justify-content: center;
  display: flex;
  margin-left: 51rem;
  margin-top: 1rem;
`;
export const DeleteButton = styled.label`
  margin-left: -2.4rem;
  width: 7.2rem;
  height: 2rem;
  padding-left: 1.1rem;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 23.8px */
  text-align: left;
  border: 1px solid #000; /* Add a 1px solid black border */
  border-radius: 2px;
  background-color: #ececec;
  font-size: 1.4rem;
  /* 
  cursor: pointer; */
  &:hover {
    background-color: #d9d9d9; /* 회색 배경색으로 변경 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
    border-radius: 2px; /* 모서리를 10px만큼 둥글게 처리 */
  }
`;
