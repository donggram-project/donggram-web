//styled 완료
import { Header } from "@components/Header/Header";
import { Banner } from "@components/Banner/Banner";
import { RecruitClub } from "@components/RecruitClub/RecruitClub";
import styled from "@emotion/styled";
import { MyClub } from "@/components/MyClub/MyClub";
import { useCallback, useState } from "react";
import { customAxios } from "@/Utils/customAxios";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import { IsLogin } from "@/components/IsLogin/IsLogin";

const PageConatiner = styled.div`
  display: flex; /* Flexbox 컨테이너로 설정 */
  flex-direction: column; /* 컬럼 방향으로 배치 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
`;
//회원정보를 확인하는 페이지와, 동아리 생성 홈페이지는 로그인후 나타나는 유저아이콘 사진에 링크를 넣어놨음
export default function Home() {
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
  ) : IsLogin() ? (
    <PageConatiner>
      <Header
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        falseSearch={falseSearch}
      />
      <Banner />
      <MyClub displayNum={4} />
      <RecruitClub displayNum={4} />
    </PageConatiner>
  ) : (
    <PageConatiner>
      <Header
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        falseSearch={falseSearch}
      />
      <Banner />
      <RecruitClub displayNum={8} />
    </PageConatiner>
  );
}
