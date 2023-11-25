import styled from "@emotion/styled";
import Image from "next/image";

export const UserInfoText = styled.div`
  width: 8.7rem;
  height: 3.2rem;
  flex-shrink: 0;
  color: #000;
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-bottom: 2rem;
  margin-top: 5rem;
`;
export const OtherInfoText = styled.div`
  width: 9rem;
  height: 3.2rem;
  flex-shrink: 0;
  color: #000;
  font-family: Roboto;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  margin-top: 3rem;
`;
export const OtherInfoTextContainer = styled.div`
  margin-right: -10rem;
`;
export const TextNImageContainer = styled.div`
  display: flex;
`;

export const ClubImageCss = styled.img`
  margin-left: 28rem;
  width: 20rem;
  height: 23rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  margin-top: 5rem;
`;
export const PageContainer = styled.div`
  margin-left: -8rem;
`;

export const BottomBorder = styled.div`
  width: 86.7rem;
  height: 1px;
  background-color: #000;
  margin-top: 5rem;
  stroke-width: 1px;
`;
export const SaveButton = styled.button`
  color: white;
  background-color: #0090f9;
  width: 11.3rem;
  height: 5.2rem;
  font-size: 2rem;
  font-weight: 500;
  margin-top: 3rem;
  margin-left: 72rem;
  margin-bottom: 5rem;
  border-radius: 3px;
  border: 2px solid #84c6f5;
`;
export const ButtonText = styled.div`
  color: var(--default-white, #fff);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: 0.5px;
`;

//

export const TextSelectBox = styled.input`
  width: 46rem;
  height: 3.2rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.1rem solid #c1c7cd;
  background: #fff;
`;
export const ImageUpLoad = styled.div`
  justify-content: center;
  display: flex;
  margin-left: 62rem;
`;
export const PlaceholderImage = styled(Image)`
  margin-left: 28rem;
  width: 20rem;
  height: 23rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  margin-top: 5rem;
  // Add any additional styles for the placeholder image here
`;
export const DeleteButton = styled.label`
  margin-left: 1rem;
  width: 5rem;
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
  /* 
  cursor: pointer; */
  &:hover {
    background-color: #d9d9d9; /* 회색 배경색으로 변경 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
    border-radius: 2px; /* 모서리를 10px만큼 둥글게 처리 */
  }
`;
