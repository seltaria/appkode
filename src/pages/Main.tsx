import { useGetUserListQuery } from "../app/userApi";
import { UserList, UserListSkeleton } from "../components";

export const Main = () => {
  const { data, isLoading, isSuccess, isError } = useGetUserListQuery();

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  if ((isSuccess && !data.length) || !Array.isArray(data)) {
    return <div>Нет данных</div>;
  }

  return (
    <div>
      <UserList users={data} />
    </div>
  );
};
