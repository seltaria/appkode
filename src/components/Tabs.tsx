import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { TabFilters } from "../constants";

const Wrapper = styled.div`
  display: flex;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-size: 15px;
  line-height: 20px;
  color: ${(props) =>
    props.$active ? props.theme.black : props.theme.lightGray};
  border-bottom: ${(props) =>
    props.$active
      ? `2px solid ${props.theme.accent}`
      : "2px solid transparent"};
  transition-property: color, border;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  &:hover {
    color: ${(props) => props.theme.black};
  }
`;

interface TabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Wrapper>
      {Object.entries(TabFilters).map(([value, label]) => (
        <Tab
          key={value}
          onClick={() => handleClick(value)}
          $active={activeTab === value}
        >
          {label}
        </Tab>
      ))}
    </Wrapper>
  );
};
