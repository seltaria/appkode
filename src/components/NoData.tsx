import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 149px;
`;

const Text = styled(Wrapper)`
  gap: 12px;
  margin-top: 0;
`;

const BlackString = styled.div`
  font-size: 17px;
  line-height: 22px;
  font-weight: 600;
`;

const GrayString = styled.div`
  color: ${(props) => props.theme.lightGray};
`;

export const NoData = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src="src/assets/images/search_not_found.png" />
      <Text>
        <BlackString>{t("Мы никого не нашли")}</BlackString>
        <GrayString>{t("Попробуй скорректировать запрос")}</GrayString>
      </Text>
    </Wrapper>
  );
};
