import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { BrowserRouter as Router } from "react-router-dom";
import { SESSION } from '../../../../utils/constants/testId.constant';
import SessionScreen from '../../../../screens/session/Session.screen';

describe('Session.screen tests', () => {
  describe('change inputs tests', () => {
    it('should change session name and error rate', () => {
      const newSessionName = 'Session name test';
      const newErrorRate = '55';

      const { getByTestId, unmount } = render(
        <Router>
          <SessionScreen />
        </Router>,
      );
        
      const sessionNameInput: HTMLInputElement = getByTestId(SESSION.SESSION_NAME_INPUT);
      fireEvent.change(
        sessionNameInput,
        {
          target: {
            value: newSessionName,
          }
        }
      );

      const errorRateInput: HTMLInputElement = getByTestId(SESSION.ERROR_RATE_INPUT);
      fireEvent.change(
        errorRateInput,
        {
          target: {
            value: newErrorRate,
          }
        }
      );

      expect(sessionNameInput.value).toBe(newSessionName);
      expect(errorRateInput.value).toBe(newErrorRate);
      unmount();
    });
  });
});