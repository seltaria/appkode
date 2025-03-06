import { useParams } from "react-router";

export const Profile = () => {
  const { id } = useParams();

  return <div>Данные о человеке c id {id}</div>;
};
