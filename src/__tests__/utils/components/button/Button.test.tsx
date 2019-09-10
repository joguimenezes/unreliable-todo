import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../../../components/button/Button';

describe('Button tests', () => {
  describe('should render correctly', () => {
    it('when is loading', () => {
      const props = {
        isLoading: true,
        text: 'Button',
      };

      const { container } = render(<Button {...props}/>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('when loaded', () => {
      const props = {
        isLoading: false,
        onClick: jest.fn(),
        text: 'Button'
      };

      const { container } = render(<Button {...props}/>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});