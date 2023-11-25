import { Header } from "@components/Header/Header";
import ClubData from "@components/ClubData/ClubData";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { customAxios } from "@/Utils/customAxios";
import { SearchResult } from "@/components/SearchResult/SearchResult";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function ClubExplain() {
  const [clubData, setClubData] = useState({});
  const router = useRouter();
  const { clubId } = router.query; // clubId를 쿼리 파라미터로 가져옵니다.
  //뒷부분 숫자를 clubId로 갖고오기

  useEffect(() => {
    if (clubId) {
      fetchClubData(clubId); // 클럽 ID를 사용하여 동아리 정보를 가져옵니다.
    }
  }, [clubId]);

  function fetchClubData(clubId: any) {
    // clubId의 숫자에 따라 각각 다른 동아리 정보 출력
    customAxios
      .get(`http://13.125.162.181:8084/clubs/${clubId}`)
      .then((res) => {
        setClubData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
    <PageContainer>
      <Header
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        falseSearch={falseSearch}
      />
      <SearchResult displayNum={8} ResultClubs={searchResult} />
    </PageContainer>
  ) : (
    <PageContainer>
      <Header
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
        falseSearch={falseSearch}
      />
      <ClubData clubData={clubData} />
    </PageContainer>
  );
}
