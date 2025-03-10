import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "../app/hooks";
import { SearchIcon, SortIcon } from "./icons";

const StyledSearchIcon = styled.div<{ $active?: boolean }>`
  position: absolute;
  left: 12px;
  top: 8px;

  & path {
    fill: ${(props) => (props.$active ? "#050510" : "#c3c3c6")};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px 10px 44px;
  font-size: 15px;
  line-height: 20px;
  border-radius: 16px;
  color: #050510;
  background-color: #f7f7f8;
  caret-color: #6534ff;

  & svg path {
    fill: #050510;
  }

  &::placeholder {
    color: #c3c3c6;
  }

  &:focus-visible {
    outline: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  position: absolute;
  right: 12px;
  top: 8px;
`;

interface SearchProps {
  setInputText: Dispatch<SetStateAction<string>>;
}

export const Search: FC<SearchProps> = ({ setInputText }) => {
  const [text, setText] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useDebounce(() => setInputText(text), 300);

  // TODO: реализовать сортировку
  const showSortModal = () => {};

  return (
    <Wrapper>
      <StyledSearchIcon $active={!!text}>
        <SearchIcon />
      </StyledSearchIcon>
      <Input
        onChange={handleChange}
        placeholder="Введи имя, фамилию или никнейм"
        value={text}
      />
      <SortButton onClick={showSortModal}>
        <SortIcon />
      </SortButton>
    </Wrapper>
  );
};
