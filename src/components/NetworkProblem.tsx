import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNetworkStatus } from "../app/hooks";

const Wrapper = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 24px 20px;
  color: #fff;
  background-color: ${(props) =>
    props.$isLoading ? props.theme.accent : props.theme.red};
`;

const Title = styled.h1`
  margin: 0 0 22px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
`;

interface NetworkProblemProps {
  refetch: () => Promise<object>;
  isFetching: boolean;
}

export const NetworkProblem: FC<NetworkProblemProps> = ({
  refetch,
  isFetching,
}) => {
  const { isOnline } = useNetworkStatus();
  const [isProblem, setIsProblem] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!isOnline) {
      setIsProblem(true);
    }
  }, [isOnline]);

  useEffect(() => {
    if (isOnline && isProblem) {
      refetch().then(() => {
        setIsProblem(false);
      });
    }
  }, [isOnline, isProblem, refetch, setIsProblem]);

  if (isOnline && !isProblem) {
    return;
  }

  return (
    <Wrapper $isLoading={isFetching && isProblem}>
      <Title>{t("Поиск")}</Title>
      <Text>
        {t(
          isFetching && isProblem
            ? "Секундочку, гружусь..."
            : "Не могу обновить данные. Проверь соединение с интернетом."
        )}
      </Text>
    </Wrapper>
  );
};
