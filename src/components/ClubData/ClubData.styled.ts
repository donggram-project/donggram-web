import styled from "@emotion/styled";
import Image from "next/image";

export const DetailExplainText = styled.div`
  margin-top: 2rem;
  margin-right: 67rem;
  width: 14.4rem;
  height: 2.6rem;
  flex-shrink: 0;
  color: black;
  font-size: 3.2rem;
  font-family: "Roboto", sans-serif;
  line-height: 140%;
  font-weight: 600;
`;
export const HeadBorder = styled.div`
  margin-top: 4rem;
  border: 0.1rem solid #000;
  width: 820px;
  height: 0;
  transform: rotate(0.066deg);
  flex-shrink: 0;
`;
export const ExplainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
`;
export const ClubImage = styled.img`
  width: 40.3rem;
  height: 44.1rem;
  margin-right: 3rem;
`;
export const ClubName = styled.div`
  width: 38.7rem;
  height: 6.7rem;
  flex-shrink: 0;
  color: black;
  font-size: 4.8rem;
  font-weight: 400;
`;

export const ClubExplainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;
export const GreyBorder = styled.div`
  margin-top: 2rem;
  border: 0.1rem solid #dde1e6;
  width: 320px;
  height: 0;
  transform: rotate(-179.792deg);
  flex-shrink: 0;
`;
export const ClubDetailExplain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -1.5rem;
`;

export const ClubExplainTextGrey = styled.span`
  color: #697077;
  font-family: "Roboto", sans-serif; //폰트 roboto사용, 불가능시 sans로 대체
  line-height: 1.4;
  font-size: 1.6rem;
  font-weight: 400;
`;
export const ClubExplainTextBlack = styled(ClubExplainTextGrey)`
  color: #000;
  width: 19rem;
  height: 3.1rem;
  margin-right: 6rem;
`;
export const RegisterButton = styled.button`
  margin-left: 5rem;
  color: white;
  background-color: #0090f9;
  width: 19.8rem;
  height: 5.2rem;
  font-size: 2rem;
  font-weight: 500;
  margin-top: 6rem;
`;

export const BottomExplainHeader = styled.div`
  margin-top: 1rem;
  margin-right: 68rem;
  width: 14.4rem;
  height: 3rem;
  flex-shrink: 0;
  color: black;
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 400;
`;
export const BottomGreyBorder = styled.div`
  margin-right: 36rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border: 0.1rem solid #dde1e6;
  width: 459px;
  height: 0;
  transform: rotate(0.374deg);
  flex-shrink: 0;
`;
export const BottomExplainText = styled.div`
  margin-right: 36rem;
  width: 459px;
  height: 10rem;
  flex-shrink: 0;
  color: black;
  font-size: 1.6rem;
  line-height: 1.4;
  font-weight: 400;
`;
