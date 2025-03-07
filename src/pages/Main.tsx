import { useGetUserListQuery } from "../app/userApi";

export const Main = () => {
  const { data, isLoading, isSuccess, isError } = useGetUserListQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  if ((isSuccess && !data.length) || !Array.isArray(data)) {
    return <div>Нет данных</div>;
  }

  return (
    <div>
      {data.map((el) => (
        <div key={el.id}>
          <img src={el.avatarUrl} alt={el.userTag} />
          <div>
            {el.firstName} {el.lastName}
          </div>
          <div>{el.userTag}</div>
          <div>{el.department}</div>
        </div>
      ))}
    </div>
  );
};
