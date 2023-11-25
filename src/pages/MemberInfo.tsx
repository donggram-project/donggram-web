import { Header } from "@components/Header/Header";
import { SideInfo } from "@/components/SideInfoFolder/SideInfo";
import styled from "@emotion/styled";
import { MainInfo } from "@/components/MainInfoFolder/MainInfo";
import { useCallback, useState } from "react";
import { customAxios } from "@/Utils/customAxios";
import { SearchResult } from "@/components/SearchResult/SearchResult";

const PageConatiner = styled.div`
  display: flex; /* Flexbox 컨테이너로 설정 */
  flex-direction: column; /* 컬럼 방향으로 배치 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function MemberInfo() {
  //검색
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(false);
  const onSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);
  const onSearchClick = useCallback(() => {
    customAxios.get(`/clubs/search?keyword=${searchValue}`).then((res) => {
      setSearchResult(res.data.data);
      setSearch(true);
    });
  }, [searchValue]);
  const falseSearch = () => {
    setSearch(false);
  };
  //<Header onSearchChange={onSearchChange} onSearchClick={onSearchClick} falseSearch={falseSearch}/>
  //<SearchResult displayNum={8} ResultClubs={searchResult} />
  return search ? (
    <PageConatiner>
      <Header
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        falseSearch={falseSearch}
      />
      <SearchResult displayNum={8} ResultClubs={searchResult} />
    </PageConatiner>
  ) : (
    <PageConatiner>
      <Header
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        falseSearch={falseSearch}
      />
      <InfoContainer>
        <SideInfo />
        <MainInfo />
      </InfoContainer>
    </PageConatiner>
  );
}
