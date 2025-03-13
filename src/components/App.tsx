import { FC, PropsWithChildren } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import { useAppSelector } from "../app/hooks";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  min-height: 100vh;
`;

export const App: FC<PropsWithChildren> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};
