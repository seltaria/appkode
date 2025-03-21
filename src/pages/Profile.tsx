import { useNavigate, useParams } from "react-router";
import { useGetUserListQuery } from "../app/userApi";
import { Error } from "../components";
import { BackIcon, FavoriteIcon, PhoneIcon } from "../components/icons";
import { NoData } from "../components/NoData";
import styled from "styled-components";
import { departments, TRANSITION_DURATION } from "../constants";
import { getUserAge, formatPhoneNumber, formatDateToShow } from "../utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 0 24px;
  background-color: ${(props) => props.theme.input};
`;

const BackButton = styled.button`
  position: absolute;
  top: 22px;
  left: 24px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: opacity ease-in-out ${TRANSITION_DURATION};

  &:hover {
    opacity: 0.7;
  }

  & path {
    fill: ${(props) => props.theme.black};
  }
`;

const Avatar = styled.img<{ $skeleton?: boolean }>`
  width: 104px;
  height: 104px;
  margin-bottom: 24px;
  border-radius: 52px;
  background: ${(props) =>
    props.$skeleton
      ? `linear-gradient(90deg, ${props.theme.firstGradient} 0%, ${props.theme.secondGradient} 100%)`
      : "unset"};
  box-shadow: 0px 8px 12px 0px #161e3414;

  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
  }
`;

const Name = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;

const NameSkeleton = styled.div`
  width: 201px;
  height: 28px;
  margin-bottom: 12px;
  border-radius: 50px;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.firstGradient} 0%, ${props.theme.secondGradient} 100%)`};
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

const Tag = styled.div`
  font-size: 17px;
  line-height: 22px;
  color: ${(props) => props.theme.lightGray};
`;

const Department = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: ${(props) => props.theme.darkGray};
`;

const DepartmentSkeleton = styled.div`
  width: 55px;
  height: 16px;
  border-radius: 50px;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.firstGradient} 0%, ${props.theme.secondGradient} 100%)`};
`;

const Age = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.lightGray};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
  font-weight: 500;

  & path {
    fill: ${(props) => props.theme.black};
  }
`;

const Dates = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.input};
`;

const Description = styled.div`
  padding: 2px 16px;
`;

const ProfileSkeleton = () => {
  return (
    <Wrapper>
      <Avatar $skeleton />
      <NameSkeleton />
      <DepartmentSkeleton />
    </Wrapper>
  );
};

export const Profile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, refetch } = useGetUserListQuery({
    department: "all",
  });

  const currentUser = useMemo(
    () => Array.isArray(data) && data.find((user) => user.id === id),
    [data, id]
  );

  const goBack = () => navigate(-1);

  return (
    <>
      <BackButton onClick={goBack}>
        <BackIcon />
      </BackButton>

      {isLoading && <ProfileSkeleton />}

      {isError && <Error refetch={refetch} />}

      {isSuccess && (!Array.isArray(data) || !data?.length) && <NoData />}

      {isSuccess && !currentUser && <NoData />}

      {isSuccess && currentUser && (
        <>
          <Wrapper>
            {/* почти никогда не работает, с lorem.space точно всё в порядке? */}
            {/* <Avatar src={currentUser.avatarUrl} alt={currentUser.userTag} /> */}
            <Avatar src="./goose.png" alt={currentUser.userTag} />
            <NameWrapper>
              <Name>
                {currentUser.firstName} {currentUser.lastName}
              </Name>
              <Tag>{currentUser.userTag}</Tag>
            </NameWrapper>
            <Department>{departments[currentUser.department]}</Department>
          </Wrapper>
          <Description>
            <Dates>
              <Info>
                <FavoriteIcon />
                {formatDateToShow(currentUser.birthday, t)}
              </Info>
              <Age>{getUserAge(currentUser.birthday, t)}</Age>
            </Dates>
            <Info>
              <PhoneIcon />
              {formatPhoneNumber(currentUser.phone)}
            </Info>
          </Description>
        </>
      )}
    </>
  );
};
