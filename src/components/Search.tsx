import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "../app/hooks";
import { SearchIcon, SortIcon } from "./icons";

const StyledSearchIcon = styled.div<{ $active?: boolean }>`
  position: absolute;
  left: 12px;
  top: 8px;

  & path {
    fill: ${(props) =>
      props.$active ? props.theme.black : props.theme.placeholder};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px 10px 44px;
  font-size: 15px;
  line-height: 20px;
  border-radius: 16px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.input};
  caret-color: ${(props) => props.theme.accent};

  & svg path {
    fill: ${(props) => props.theme.black};
  }

  &::placeholder {
    color: ${(props) => props.theme.placeholder};
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
