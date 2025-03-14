import styled from "styled-components";
import { UserCard, UserSkeleton } from "./UserCard";
import { FC } from "react";
import { User } from "../types/User";
import { NoData } from "./NoData";
import { Error } from "./Error";
import { formatDateToSort } from "../utils";
import { useSearchParams } from "react-router";

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
  data: User[] | undefined;
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

const searchUser = (userList: User[] | undefined, text: string): User[] => {
  const formattedText = text.toLowerCase();

  return (
    userList?.filter((user) => {
      const searchParams = `${user.firstName} ${user.lastName} ${user.userTag}`;

      return searchParams.toLowerCase().indexOf(formattedText) !== -1;
    }) || []
  );
};

export const UserList: FC<UserListProps> = ({
  data,
  isLoading,
  isFetching,
  isError,
  isSuccess,
  refetch,
}) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get("sort") || "";
  const activeTab = searchParams.get("tab") || "all";
  const searchText = searchParams.get("search") || "";

  if (isLoading || isFetching) {
    return <UserListSkeleton />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }

  const users = searchUser(
    (Array.isArray(data) ? data : []).filter(
      (user) => activeTab === "all" || user.department === activeTab
    ),
    searchText || ""
  );

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

  const currentYearBirthdays = sortedUsers
    .filter((user) => formatDateToSort(user.birthday) > today)
    .map((user) => <UserCard key={user.id} {...user} />);

  const nextYearBirthdays = sortedUsers
    .filter((user) => formatDateToSort(user.birthday) < today)
    .map((user) => <UserCard key={user.id} {...user} />);

  const userElements =
    sortParam === "birthday" ? (
      <>
        {currentYearBirthdays}
        {!!nextYearBirthdays.length && <Year>2026</Year>}
        {nextYearBirthdays}
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
