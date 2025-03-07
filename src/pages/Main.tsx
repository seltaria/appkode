import { useState } from "react";
import { useGetUserListQuery } from "../app/userApi";
import { Tabs, UserList } from "../components";

export const Main = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetUserListQuery(activeTab);

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <UserList
        users={data?.filter(
          (user) => activeTab === "all" || user.department === activeTab
        )}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
      />
    </div>
  );
};
