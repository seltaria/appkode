import styled from "styled-components";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";

const Title = styled.h1`
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>{t("Поиск")}</Title>
      <Buttons>
        <LangSwitcher />
        <ThemeSwitcher />
      </Buttons>
    </Wrapper>
  );
};
