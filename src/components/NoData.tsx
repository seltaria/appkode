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
  color: #97979b;
`;

export const NoData = () => {
  return (
    <Wrapper>
      <img src="src/assets/images/search_not_found.png" />
      <Text>
        <BlackString>Мы никого не нашли</BlackString>
        <GrayString>Попробуй скорректировать запрос</GrayString>
      </Text>
    </Wrapper>
  );
};
