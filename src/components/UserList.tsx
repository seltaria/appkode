import styled from "styled-components";
import { UserCard, UserSkeleton } from "./UserCard";
import { FC } from "react";
import { User } from "../types/User";

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
  if (isLoading || isFetching) {
    return <UserListSkeleton />;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  if ((isSuccess && !users?.length) || !Array.isArray(users)) {
    return <div>Нет данных</div>;
  }

  return (
    <Wrapper>
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.firstName}
          surname={user.lastName}
          avatarSrc={user.avatarUrl}
          department={user.department}
          tag={user.userTag}
        />
      ))}
    </Wrapper>
  );
};
