import { FC } from "react";
import styled from "styled-components";
import { departments, TRANSITION_DURATION } from "../constants";
import { Link, useSearchParams } from "react-router";
import { User } from "../types/User";
import { formatDateToShow } from "../utils";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div<{ $skeleton?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 0;
  border-radius: 10px;
  transition: background-color ease-in-out ${TRANSITION_DURATION};
  pointer-events: ${(props) => (props.$skeleton ? "none" : "unset")};

  &:hover {
    background-color: ${(props) => props.theme.input};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Avatar = styled.div<{ $skeleton?: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50px;
  background: ${(props) =>
    props.$skeleton
      ? `linear-gradient(90deg, ${props.theme.firstGradient} 0%, ${props.theme.secondGradient} 100%)`
      : "none"};

  @media (max-width: 500px) {
    width: 50px;
    height: 50px;
  }
`;

const NameSkeleton = styled.div`
  width: 144px;
  height: 16px;
  border-radius: 50px;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.firstGradient} 0%, ${props.theme.secondGradient} 100%)`};
`;

const DepartmentSkeleton = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 50px;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.firstGradient} 0%, ${props.theme.secondGradient} 100%)`};
`;

const Name = styled.div`
  font-weight: 500;
  line-height: 20px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Tag = styled.div`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.lightGray};
`;

const Department = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: ${(props) => props.theme.darkGray};
`;

const Birthday = styled.div`
  padding-right: 5px;
  margin-left: auto;
  font-size: 15px;
  line-height: 20px;
  color: ${(props) => props.theme.darkGray};
`;

export const UserSkeleton = () => {
  return (
    <Wrapper $skeleton>
      <Avatar $skeleton />
      <Info>
        <NameSkeleton />
        <DepartmentSkeleton />
      </Info>
    </Wrapper>
  );
};

export const UserCard: FC<User> = (user) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const { id, firstName, lastName, userTag, department, birthday } = user;

  const isSortedByDay = searchParams.get("sort") === "birthday";

  return (
    <Link to={`${id}`}>
      <Wrapper>
        {/* почти никогда не работает, с lorem.space точно всё в порядке? */}
        {/* <Avatar as="img" src={avatarUrl} alt={userTag} /> */}
        <Avatar as="img" src={"./goose.png"} alt={userTag} />
        <Info>
          <NameWrapper>
            <Name>
              {firstName} {lastName}
            </Name>
            <Tag>{userTag}</Tag>
          </NameWrapper>
          <Department>{t(departments[department])}</Department>
        </Info>
        {isSortedByDay && (
          <Birthday>{formatDateToShow(birthday, t, true)}</Birthday>
        )}
      </Wrapper>
    </Link>
  );
};
