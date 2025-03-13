import { useState } from "react";
import { useGetUserListQuery } from "../app/userApi";
import { Header, Search, Tabs, UserList } from "../components";
import styled from "styled-components";
import { useSearchParams } from "react-router";

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

export const Main = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "all");

  const { data, isLoading, isFetching, refetch, isSuccess, isError } =
    useGetUserListQuery({ department: activeTab });

  return (
    <Wrapper>
      <Header />
      <Search />
      <ContentWrapper>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <UserList
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          refetch={refetch}
        />
      </ContentWrapper>
    </Wrapper>
  );
};
