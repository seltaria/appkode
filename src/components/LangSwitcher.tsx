import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Button = styled.button<{ $active?: boolean }>`
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  color: ${(props) =>
    props.$active ? props.theme.black : props.theme.lightGray};
`;

const languages = [
  { label: "RU", value: "ru" },
  { label: "EN", value: "en" },
];

export const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLangSwitch = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  return (
    <div>
      {languages.map((el) => (
        <Button
          $active={currentLanguage === el.value}
          key={el.value}
          onClick={() => handleLangSwitch(el.value)}
        >
          {el.label}
        </Button>
      ))}
    </div>
  );
};
