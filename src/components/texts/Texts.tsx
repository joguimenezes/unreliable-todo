import styled from 'styled-components';

import COLORS from '../../utils/constants/color.constant';

const Bold = styled.span`
  color: ${COLORS.PRIMARY};
  font-weight: bold;
`;

const Label = styled.span`
  color: ${COLORS.PRIMARY};
`;

const Title = styled.h1`
  color: ${COLORS.WHITE};
  margin: 0;
  padding: 0;
`;

export {
  Bold,
  Label,
  Title,
}