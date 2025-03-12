import { useState } from "react";
import { useGetUserListQuery } from "../app/userApi";
import { Search, Tabs, ThemeSwitcher, UserList } from "../components";
import { User } from "../types/User";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;

const searchUser = (
  userList: User[] | undefined,
  text: string
): User[] | undefined => {
  const formattedText = text.toLowerCase();

  return userList?.filter((user) => {
    const searchParams = `${user.firstName} ${user.lastName} ${user.userTag}`;

    return searchParams.toLowerCase().indexOf(formattedText) !== -1;
  });
};

export const Main = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [inputText, setInputText] = useState("");

  const { data, isLoading, isFetching, refetch, isSuccess, isError } =
    useGetUserListQuery({ department: activeTab });

  return (
    <Wrapper>
      <Title>Поиск</Title>
      <Search setInputText={setInputText} />
      <ContentWrapper>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <UserList
          users={searchUser(
            data?.filter(
              (user) => activeTab === "all" || user.department === activeTab
            ),
            inputText
          )}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          refetch={refetch}
        />
      </ContentWrapper>
      <ThemeSwitcher />
    </Wrapper>
  );
};
