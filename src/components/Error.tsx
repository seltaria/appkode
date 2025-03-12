import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 133px;
`;

const TextWrapper = styled(Wrapper)`
  gap: 12px;
  margin-top: 0;
`;

const BlackText = styled.div`
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
`;

const GrayText = styled.div`
  color: ${(props) => props.theme.lightGray};
`;

const RetryButton = styled.button`
  color: ${(props) => props.theme.accent};
`;

interface ErrorProps {
  refetch: () => void;
}

export const Error: FC<ErrorProps> = ({ refetch }) => {
  const { t } = useTranslation();
  const retry = () => refetch();

  return (
    <Wrapper>
      <img src="src/assets/images/error.png" />
      <TextWrapper>
        <BlackText>{t("Какой-то сверхразум все сломал")}</BlackText>
        <GrayText>{t("Постараемся быстро починить")}</GrayText>
        <RetryButton onClick={retry}>{t("Попробовать снова")}</RetryButton>
      </TextWrapper>
    </Wrapper>
  );
};
