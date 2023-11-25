import styled from "@emotion/styled";
import Image from "next/image";

export const UserImage = styled.img`
  width: 19.6rem;
  height: 22.2rem;
`;
export const Placeholder = styled(Image)`
  width: 19.6rem;
  height: 22.2rem;
`;
export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`;
export const Body = styled.div`
  margin-top: 3rem;
`;
export const Text = styled.div`
  font-size: 1.8rem;
  line-height: 140%;
  margin-left: 0.5rem;
`;
export const Value = styled.input`
  width: 52rem;
  height: 4.8rem;
  padding: 1.2rem 1.6rem;
  margin-left: 0rem;
  margin-bottom: 0.9rem;
  margin-top: 1.2rem;
  border-radius: 0.8rem;
  border-bottom: 1px solid #c1c7cd;
  background: #f2f4f8;
  font-size: 1.8rem;
  line-height: 140%;
  margin-left: 0.5rem;
  outline: none;
`;
export const Clubs = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1.5rem;
  margin-bottom: 4rem;
  height: 1rem;
`;
export const ClubBox = styled.div`
  padding: 0 0.5rem;
  width: auto;
  min-width: 7.6rem;
  max-width: 10rem;
  height: 2.4rem;
  text-overflow: ellipsis;
  border-radius: 0.5rem;
  background: #0090f9;
  color: white;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
`;
export const Delete = styled.button`
  width: 8.6rem;
  height: 2.9rem;
  border-radius: 0.3rem;
  border: 2px solid #fe2a2a;
  background: #fe2a2a;
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  &:hover {
    box-shadow: 0.1rem 0.1rem 0.3rem 0.1rem #e02626 inset;
  }
  &:active {
    box-shadow: 0.2rem 0.2rem 0.3rem 0.2rem #e02626 inset;
  }
`;
export const Buttons = styled.div`
  margin-top: 4.5rem;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;
export const CompleteButtons = styled.div``;
export const Cancle = styled.button`
  width: 9.4rem;
  height: 4rem;
  border-radius: 0.5rem;
  border: 1px solid #dde1e6;
  font-size: 1.8rem;
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
  margin-left: 1.3rem;
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

export const Majors = styled(Text)`
  background: none;
  border: none;
  display: flex;
  gap: 1rem;
  width: 52rem;
  height: 4.8rem;
  padding: 1.2rem 1.6rem;
  margin-left: 0rem;
  margin-bottom: 0.9rem;
  margin-top: 1.2rem;
  font-size: 1.8rem;
  line-height: 140%;
  margin-left: 0.5rem;
`;
