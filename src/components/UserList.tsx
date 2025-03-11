import styled from "styled-components";
import { UserCard, UserSkeleton } from "./UserCard";
import { FC } from "react";
import { User } from "../types/User";
import { NoData } from "./NoData";
import { useAppSelector } from "../app/hooks";
import { Error } from "./Error";
import { formatDateToSort } from "../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Year = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: ${(props) => props.theme.placeholder};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: calc(50% - 80px);
    height: 1px;
    background-color: ${(props) => props.theme.placeholder};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

interface UserListProps {
  users: User[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

export const UserListSkeleton = () => {
  return (
    <Wrapper>
      {Array.from(Array(10).keys()).map((el) => (
        <UserSkeleton key={el} />
      ))}
    </Wrapper>
  );
};

export const UserList: FC<UserListProps> = ({
  users,
  isLoading,
  isFetching,
  isError,
  isSuccess,
  refetch,
}) => {
  const sortParam = useAppSelector((state) => state.users.sort);

  if (isLoading || isFetching) {
    return <UserListSkeleton />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }

  if ((isSuccess && !users?.length) || !Array.isArray(users)) {
    return <NoData />;
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (sortParam === "name") {
      return `${a.firstName} ${a.lastName}` > `${b.firstName} ${b.lastName}`
        ? 1
        : -1;
    }
    if (sortParam === "birthday") {
      return formatDateToSort(a.birthday) > formatDateToSort(b.birthday)
        ? 1
        : -1;
    }

    return 0;
  });

  const today = formatDateToSort(new Date());

  const userElements =
    sortParam === "birthday" ? (
      <>
        {sortedUsers
          .filter((user) => formatDateToSort(user.birthday) > today)
          .map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        <Year>2026</Year>
        {sortedUsers
          .filter((user) => formatDateToSort(user.birthday) < today)
          .map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
      </>
    ) : (
      <>
        {sortedUsers.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </>
    );

  return <Wrapper>{userElements}</Wrapper>;
};
