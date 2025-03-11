import { FC } from "react";
import styled from "styled-components";
import { departments } from "../constants";
import { Link } from "react-router";
import { User } from "../types/User";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { saveCurrentUser } from "../app/slices/userSlice";
import { formatDateToShow } from "../utils";

const Wrapper = styled.div<{ $skeleton?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 0;
  border-radius: 10px;
  transition: background-color ease-in-out 0.2s;
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
      ? "linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%)"
      : "none"};
`;

const NameSkeleton = styled.div`
  width: 144px;
  height: 16px;
  border-radius: 50px;
  background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
`;

const DepartmentSkeleton = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 50px;
  background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
`;

const Name = styled.div`
  font-weight: 500;
  line-height: 20px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
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
  const { id, firstName, lastName, userTag, avatarUrl, department, birthday } =
    user;

  const dispatch = useAppDispatch();
  const isSortedByDay = useAppSelector(
    (state) => state.users.sort === "birthday"
  );

  const handleClick = () => dispatch(saveCurrentUser(user));

  return (
    <Link to={`${id}`} onClick={handleClick}>
      <Wrapper>
        <Avatar as="img" src={avatarUrl} alt={userTag} />
        <Info>
          <NameWrapper>
            <Name>
              {firstName} {lastName}
            </Name>
            <Tag>{userTag}</Tag>
          </NameWrapper>
          <Department>{departments[department]}</Department>
        </Info>
        {isSortedByDay && (
          <Birthday>{formatDateToShow(birthday, true)}</Birthday>
        )}
      </Wrapper>
    </Link>
  );
};
