import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';

import { Bold } from '../../texts/Texts';
import { MODAL } from '../../../utils/constants/testId.constant';
import { ModalFooter } from './Wrappers';
import { SessionType } from '../../../types/sessionType';
import { toast } from 'react-toastify';
import { updateSession, deleteSession } from '../../../api/sessionApi';
import Button from '../../button/Button';
import COLORS from '../../../utils/constants/color.constant';
import getLocalStorageSession from '../../../utils/helpers/localStorage';
import MEDIA_QUERIES from '../../../utils/constants/mediaQuery.constant';
import RoundedInput from '../../inputs/RoundedInput';
import useModal from '../../../hooks/useModal';


const SessionModal = ({ history }: RouteComponentProps) => {
  const { handleCloseModal } = useModal();
  const session = getLocalStorageSession();
  const parsedSession = session ? JSON.parse(session) : null;;

  const initialErrorRate = parsedSession ? parsedSession.errorRate : null;
  const [errorRate, setErrorRate] = useState(initialErrorRate);

  const handleUpdateErroRate = (error: string) => {
    console.log('error', error)
    if (error) {
      setErrorRate(error);
    }
  };

  const handleUpdateSession = async () => {
    if (!session) return;

    try {
      await updateSession(parseInt(errorRate, 10), parsedSession.sessionId);
      const newSession: SessionType = {
        ...parsedSession,
        errorRate,
      };
      localStorage.setItem('@unreliable-todo/sessionId', JSON.stringify(newSession));
      toast('😁 Session successfully changed', { type: toast.TYPE.SUCCESS });
    } catch {
      throw toast('Oops, something went wrong!!', { type: toast.TYPE.ERROR});
    }
  };

  const handleDeleteSession = async () => {
    try {
      await deleteSession(parsedSession.sessionId);
      history.push('/');
      localStorage.removeItem('@unreliable-todo/sessionId');
      handleCloseModal(); 
      toast('😁 Session successfully deleted', { type: toast.TYPE.SUCCESS });
    } catch {
      throw toast('Oops, something went wrong!!', { type: toast.TYPE.ERROR});
    }
  };

  return (
    <Fragment>
        <Main>
          <TextWrapper>
            <Bold>Error rate:</Bold>
            <StyledRoundedInput
              onChange={e => handleUpdateErroRate(e.target.value)}
              testId={MODAL.URGENCY_INPUT}
              value={errorRate}
            />
          </TextWrapper>
        </Main>
        <ModalFooter>
          <StyledButton 
            isLoading={false}
            onClick={handleDeleteSession}
            text="Delete session"
          />
          <Button 
            isLoading={false}
            onClick={handleUpdateSession}
            text="Save session"
          />
        </ModalFooter>
    </Fragment>
  )
};

const StyledButton = styled(Button)`
  background-color: ${COLORS.SALMON};
  color: ${COLORS.WHITE};
  margin-right: 10px;
`;

const StyledRoundedInput = styled(RoundedInput)`
  border-color: ${COLORS["PRIMARY-20%"]};
  color: ${COLORS.PRIMARY};
  width: 100%;
`;

const TextWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  width: calc(100% - 25px);

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 0;
    width: 100%;
  }
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 50px auto 0;
    width: 550px;
  }
`;

export default withRouter(SessionModal);