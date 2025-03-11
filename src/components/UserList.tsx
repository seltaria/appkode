import styled from "styled-components";
import { UserCard, UserSkeleton } from "./UserCard";
import { FC } from "react";
import { User } from "../types/User";
import { NoData } from "./NoData";
import { useAppSelector } from "../app/hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface UserListProps {
  users: User[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
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
}) => {
  const sortParam = useAppSelector((state) => state.users.sort);

  if (isLoading || isFetching) {
    return <UserListSkeleton />;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
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
      return new Date(a.birthday) > new Date(b.birthday) ? 1 : -1;
    }

    return 0;
  });

  return (
    <Wrapper>
      {sortedUsers.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </Wrapper>
  );
};
