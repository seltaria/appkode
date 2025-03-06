import { Route, Routes } from "react-router";
import { Main, NotFound, Profile } from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path=":id" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
