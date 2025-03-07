import { createHashRouter } from "react-router-dom";
import { Main, NotFound, Profile } from "../pages";

export const router = createHashRouter([
  { path: "/", element: <Main /> },
  { path: ":id", element: <Profile /> },
  { path: "*", element: <NotFound /> },
]);
