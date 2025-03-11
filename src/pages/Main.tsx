import { useState } from "react";
import { useGetUserListQuery } from "../app/userApi";
import { Search, Tabs, UserList } from "../components";
import { User } from "../types/User";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px 16px;
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

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetUserListQuery(activeTab);

  return (
    <Wrapper>
      <Search setInputText={setInputText} />
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
      />
    </Wrapper>
  );
};
