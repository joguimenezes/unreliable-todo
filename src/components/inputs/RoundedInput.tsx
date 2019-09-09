import React from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/constants/color.constant';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';

type RoundedInputProps = {
  className?: string,
  label?: string,
  labelColor?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => string | void,
  placeholder?: string,
  testId?: string,
  value?: string | number,
};

const RoundedInput = ({
  className,
  label,
  labelColor,
  onChange,
  placeholder,
  testId,
  value,
}: RoundedInputProps) => (
    <Wrapper>
      <Label labelColor={labelColor}>{label}</Label>
      <Input
        className={className}
        data-testid={testId}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </Wrapper>
);

type LabelProps = {
  labelColor?: string,
};

const Label = styled.label`
  color: ${({ labelColor }: LabelProps) => labelColor || COLORS.WHITE};
  font-weight: bold;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid ${COLORS.WHITE};
  color: ${COLORS.WHITE};
  font-size: 14px;
  height: 55px;
  margin-bottom: 20px;
  padding-left: 15px;
  width: calc(100% - 45px);

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    width: 370px;
  }
`;

export default RoundedInput;