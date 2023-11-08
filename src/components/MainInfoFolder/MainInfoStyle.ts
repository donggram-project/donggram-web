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

export const ClubImageCss = styled(Image)`
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

export const TextSelectBox = styled.div`
  width: 46rem;
  height: 3.2rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.1rem solid #c1c7cd;
  background: #fff;
`;
export const TextNImageBox = styled.div`
  border-radius: 5px;
  background: #c1c7cd;
  display: flex;
  width: 20rem;
  padding: 2px 4px 2px 10px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-top: 0.3rem;
`;

export const CloseXimage = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;
export const Texting = styled.div`
  /* color: var(--cool-gray-90, #21272a); */
  font-family: Roboto;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  font-family: Roboto;

  &#NoneBox {
    margin-top: 0.4rem;
    margin-left: 0.5rem;
  }
`;
