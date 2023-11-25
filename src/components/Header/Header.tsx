//메인 페이지의 헤더
import logo from "@public/logo.png";
import { LoginButton } from "@components/LoginButton/LoginButton";
import { UserButton } from "@components/UserButton/UserButton";
import search_icon from "@public/search-icon.svg";
import Link from "next/link";
import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  LogoText,
  BoardContainer,
  ClubText,
  SearchContainer,
  SearchImage,
  SearchInput,
  GreyBorder,
} from "./Header.styled";
import { IsLogin } from "@/components/IsLogin/IsLogin";
import { useCallback, useEffect, useState } from "react";

interface ParentProps {
  onSearchClick: () => void;
  onSearchChange: (value: string) => void;
}

export const Header = ({ onSearchClick, onSearchChange }: ParentProps) => {
  const [LoginHeader, setLoginHeader] = useState(false);
  useEffect(() => {
    setLoginHeader(IsLogin());
  }, []);
  const LoginButtonControl = useCallback(() => {
    return LoginHeader ? (
      <UserButton LoginControl={setLoginHeader} />
    ) : (
      <LoginButton LoginControl={setLoginHeader} />
    );
  }, [LoginHeader]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearchClick();
      }
    },
    [onSearchClick]
  );
  const handleLoginMenu = useCallback(() => {
    if (LoginHeader) {
      return <Link href="../MyClubPage">내 동아리</Link>;
    }
    return <Link href="../MyClubPage">모집 동아리</Link>;
  }, [LoginHeader]);
  return (
    <header>
      <HeaderContainer>
        <Link href="../">
          <LogoContainer>
            <LogoImage src={logo} alt="logo" />
            <LogoText>DONGRAM</LogoText>
          </LogoContainer>
        </Link>
        <BoardContainer>
          <ClubText>
            <Link href="../ClubPage">동아리정보</Link>
          </ClubText>
          <ClubText>{handleLoginMenu()}</ClubText>
        </BoardContainer>
        <SearchContainer>
          <SearchImage
            src={search_icon}
            alt="search-icon"
            onClick={onSearchClick}
          />
          <SearchInput
            type="text"
            placeholder="Search for..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </SearchContainer>
        {LoginButtonControl()}
      </HeaderContainer>
      <GreyBorder />
    </header>
  );
};
