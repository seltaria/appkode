import { ChangeEvent, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useDebounce } from "../app/hooks";
import { SearchIcon, SortIcon } from "./icons";
import { SortModal } from "./SortModal";
import { TRANSITION_DURATION } from "../constants";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

const StyledSearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;

  @media (max-width: 500px) {
    display: none;
  }

  & path {
    transition: fill ease-in-out ${TRANSITION_DURATION};
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

  @media (max-width: 500px) {
    padding: 10px 12px;
    font-size: 14px;
  }

  & svg path {
    fill: ${(props) => props.theme.black};
  }

  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus ~ ${StyledSearchIcon} {
    & path {
      fill: ${(props) => props.theme.black};
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const SortButton = styled.button<{ $filtered?: boolean }>`
  position: absolute;
  right: 12px;
  top: 8px;
  transition: opacity ease-in-out ${TRANSITION_DURATION};

  &:hover {
    opacity: 0.7;
  }

  & path {
    fill: ${(props) =>
      props.$filtered ? props.theme.accent : props.theme.lightGray};
  }
`;

const GlobalStyle = createGlobalStyle<{ $isModalOpen: boolean }>`
  html {
    overflow: ${(props) => (props.$isModalOpen ? "hidden" : "unset")};
  }
`;

export const Search = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState(searchParams.get("search") || "");
  const [isSortModal, setIsSortModal] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const debouncedInput = useDebounce(text, 500);

  useEffect(() => {
    if (typeof debouncedInput === "string") {
      setSearchParams((params) => {
        params.set("search", debouncedInput);
        return params;
      });
    }
  }, [debouncedInput, setSearchParams]);

  const isFiltered = !!searchParams.get("sort");

  const showSortModal = () => setIsSortModal(true);
  return (
    <Wrapper>
      <GlobalStyle $isModalOpen={isSortModal} />
      <Input
        onChange={handleChange}
        placeholder={t("Введи имя, фамилию или никнейм")}
        value={text}
      />
      <StyledSearchIcon>
        <SearchIcon />
      </StyledSearchIcon>
      <SortButton onClick={showSortModal} $filtered={isFiltered}>
        <SortIcon />
      </SortButton>
      {isSortModal && <SortModal setIsSortModal={setIsSortModal} />}
    </Wrapper>
  );
};
