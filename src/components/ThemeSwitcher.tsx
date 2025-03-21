import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTheme } from "../app/slices/themeSlice";
import { saveThemeToLS } from "../utils";
import { useTranslation } from "react-i18next";

const Toggle = styled.button`
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.accent};
  box-shadow: inset 0 0 4px 0 ${(props) => props.theme.white};
  transition: all ease-in-out 0.7s;
`;

const Circle = styled.div<{ $dark: boolean }>`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white};
  box-shadow: inset 0 0 4px 0 ${(props) => props.theme.accent};
  top: 4px;
  transform: ${(props) => (props.$dark ? 0 : "translateX(14px)")};
  transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.7s;
`;

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
    saveThemeToLS(newTheme);
  };

  return (
    <Toggle onClick={toggleTheme} title={t("Сменить тему")}>
      <Circle $dark={theme === "dark"} />
    </Toggle>
  );
};
