import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CloseIcon } from "./icons";
import { TRANSITION_DURATION } from "../constants";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

const Modal = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.modalBg};
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  width: 373px;
  height: 192px;
  padding: 16px;
  border-radius: 20px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};

  @media (max-width: 500px) {
    width: 240px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.input};

  & path {
    transition: fill ease-in-out ${TRANSITION_DURATION};
  }

  &:hover path {
    fill: ${(props) => props.theme.darkGray};
  }
`;

const Title = styled.h2`
  margin: 8px 0 36px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const Radio = styled.div<{ $active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: ${(props) => (props.$active ? "6px" : "2px")} solid
    ${(props) => props.theme.accent};
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: opacity ease-in-out ${TRANSITION_DURATION};

  &:hover {
    opacity: 0.7;
  }
`;

interface SortModalProps {
  setIsSortModal: Dispatch<SetStateAction<boolean>>;
}

const sortParams = [
  { label: "По алфавиту", value: "name" },
  { label: "По дню рождения", value: "birthday" },
];

export const SortModal: FC<SortModalProps> = ({ setIsSortModal }) => {
  const closeModal = useCallback(() => setIsSortModal(false), [setIsSortModal]);

  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" ? closeModal() : null;
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeModal]);

  let root = document.getElementById("portal-root");
  if (!root) {
    const element = document.createElement("div");
    element.setAttribute("id", "portal-root");
    document.body.appendChild(element);
    root = element;
  }

  const chooseSortParam = (param: string) => {
    setSearchParams((params) => {
      if (params.get("sort") === param) {
        params.set("sort", "");
      } else {
        params.set("sort", param);
      }

      return params;
    });
  };

  const sortParam = searchParams.get("sort") || "";

  return createPortal(
    <Modal onClick={closeModal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
        <Title>{t("Сортировка")}</Title>
        <OptionList>
          {sortParams.map((el) => (
            <Option onClick={() => chooseSortParam(el.value)} key={el.value}>
              <Radio $active={sortParam === el.value} /> {t(el.label)}
            </Option>
          ))}
        </OptionList>
      </Wrapper>
    </Modal>,
    root
  );
};
