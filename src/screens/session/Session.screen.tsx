import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Bold, Title } from '../../components/text/Texts';
import { createSession } from '../../api/sessionApi';
import { SESSION } from '../../utils/constants/testId.constant';
import { SessionType } from '../../types/sessionType';
import { showErrorNotification, showSuccessNotification } from '../../utils/helpers/displayNotifications';
import Background from '../../assets/images/session-background-image.svg';
import Button from '../../components/button/Button';
import COLORS from '../../utils/constants/color.constant';
import getDiffBetweenDatesInMinutes from '../../utils/helpers/getDiffBetweenDatesInMinutes';
import getLocalStorageSession from '../../utils/helpers/localStorage';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import RoundedInput from '../../components/input/RoundedInput';

const Session = ({ history }: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorRate, setErrorRate] = useState(0);

  const handleUpdateErroRate = (errorRate: string) => {
    const formattedErrorErate = parseInt(errorRate, 10);
    const isValid = Number(formattedErrorErate);

    if (isValid) {
      setErrorRate(formattedErrorErate);
    }
  };

  const validateErrorRate = () => {
    const isErrorRateValid = errorRate >= 0 && errorRate <= 100;

    if (!isErrorRateValid) {
      setIsLoading(false);
      throw showErrorNotification('Error rate cannot be less than 0 or greater than 100.')
    }
  };

  const handleCreateSession = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    validateErrorRate();

    try {
      const { sessionId } = await createSession(errorRate);
      const newSession: SessionType = {
        createdAt: new Date(),
        errorRate,
        sessionId,
      };

      handleUpdateSession(newSession);
      history.push('/todos');
    } catch {
      throw showErrorNotification();
    } finally {
        setIsLoading(false);
    }
  };

  const handleUpdateSession = (session: SessionType) => {
    localStorage.setItem('@unreliable-todo/sessionId', JSON.stringify(session));
  };

  const validateSession = (session: string) => {
    const formattedSession: SessionType = JSON.parse(session);

    if (formattedSession) {
      const currentDate = new Date();
      const diffInMinutes = getDiffBetweenDatesInMinutes(currentDate, new Date(formattedSession.createdAt));
      return diffInMinutes < 20;
    }

    return false;
  }

  useEffect(() => {
    const redirectToTasksScreen = () => {
      const session = getLocalStorageSession();

      if (session) {
        const isSessionValid = validateSession(session);

        if (isSessionValid) {
          const formattedSession: SessionType = JSON.parse(session);
          const newSession: SessionType = {
            ...formattedSession,
            createdAt: new Date(),
          }

          handleUpdateSession(newSession);
          showSuccessNotification('You have been redirected because already exists an active session.');
          history.push('/todos');
        }
      }
    };

    redirectToTasksScreen();
  }, []);

  return (
    <Wrapper>
      <LeftWrapper />
      <RightWrapper onSubmit={handleCreateSession}>
          <StyledTitle>
            The <StyledBold>Unreliable TODO</StyledBold> task manager
          </StyledTitle>
          <RoundedInput label="Session name" testId={SESSION.SESSION_NAME_INPUT} />
          
          <RoundedInput
            label="Error rate"
            onChange={e => handleUpdateErroRate(e.target.value)}
            testId={SESSION.ERROR_RATE_INPUT}
            value={errorRate}
          />

          <Button
            isLoading={isLoading}
            onClick={handleCreateSession}
            testId={SESSION.CREATE_SESSION_BUTTON}
            text="Create session"
          />
      </RightWrapper>
    </Wrapper>
  )
};

const StyledBold = styled(Bold)`
  color: ${COLORS.WHITE};
  display: block;
  font-size: 60px;
`;

const StyledTitle = styled(Title)`
  font-size: 60px;
  font-weight: 400;
  margin: 0 0 50px 0;
`;

const Wrapper = styled.div`
  background: transparent linear-gradient(61deg, #1E2A39 0%, #364455 100%) 0% 0% no-repeat padding-box;
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftWrapper = styled.div`
  display: none;
  width: 0%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    background: url(${Background}) no-repeat center;
    display: block;
    margin-right: 5%;
    width: 55%;
  }
`;

const RightWrapper = styled.form`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  width: 100%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin-left: 0;
    width: 40%;
  }
`;

export default withRouter(Session);