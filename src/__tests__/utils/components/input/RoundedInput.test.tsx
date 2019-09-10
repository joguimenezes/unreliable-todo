import React from 'react';
import { render } from '@testing-library/react';
import RoundedInput from '../../../../components/input/RoundedInput';

describe('RoundedInput tests', () => {
  describe('should render correctly', () => {
    it('when has onChange and value', () => {
      const props = {
        value: 100,
        onChange: jest.fn(),
      };

      const { container } = render(<RoundedInput {...props}/>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('when has placeholder, onChange and value', () => {
      const props = {
        onChange: jest.fn(),
        placeholder: 'Placeholder',
        value: 'Name',
      };

      const { container } = render(<RoundedInput {...props}/>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});