import { FC } from "react";
import styled from "styled-components";
import { departments } from "../constants";
import { DepartmentsValue } from "../enums";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Avatar = styled.div<{ $skeleton?: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50px;
  background: ${(props) =>
    props.$skeleton
      ? "linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%)"
      : "none"};
`;

const NameSkeleton = styled.div`
  width: 144px;
  height: 16px;
  border-radius: 50px;
  background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
`;

const DepartmentSkeleton = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 50px;
  background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
`;

const Name = styled.div`
  font-weight: 500;
  line-height: 20px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const Tag = styled.div`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #97979b;
`;

const Department = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: #55555c;
`;

interface UserCardProps {
  name: string;
  surname: string;
  tag: string;
  avatarSrc: string;
  department: DepartmentsValue;
}

export const UserSkeleton = () => {
  return (
    <Wrapper>
      <Avatar $skeleton />
      <Info>
        <NameSkeleton />
        <DepartmentSkeleton />
      </Info>
    </Wrapper>
  );
};

export const UserCard: FC<UserCardProps> = ({
  name,
  surname,
  tag,
  avatarSrc,
  department,
}) => {
  return (
    <Wrapper>
      <Avatar as="img" src={avatarSrc} alt={tag} />
      <Info>
        <NameWrapper>
          <Name>
            {name} {surname}
          </Name>
          <Tag>{tag}</Tag>
        </NameWrapper>
        <Department>{departments[department]}</Department>
      </Info>
    </Wrapper>
  );
};
