//동아리 컴포넌트
import clubimage from "@public/placeholder.png";
import { Category } from "@components/Category/Category";
import {
  ClubIndexContainer,
  ClubImage,
  ClubName,
  ClubIndexExplain,
} from "./Club.styled";
import { useCallback } from "react";
import Link from "next/link";

interface ClubProps {
  recruit: string;
  college: string;
  department: string;
  name: string;
  id: string;
  image: string;
}

export function Club({
  recruit,
  college,
  department,
  name,
  id,
  image,
}: ClubProps) {
  return (
    <ClubIndexContainer>
      <Link href={`/ClubExplain?clubId=${id}`}>
        <ClubImage src={image} alt="club main image" />
        <ClubIndexExplain>
          <Category props={recruit} />
          <Category props={college} />
          <Category props={department} />
          <ClubName>{name}</ClubName>
        </ClubIndexExplain>
      </Link>
    </ClubIndexContainer>
  );
}
