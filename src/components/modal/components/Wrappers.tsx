import styled from 'styled-components';

import COLORS from '../../../utils/constants/color.constant';

const ModalFooter = styled.footer`
  align-items: center;
  border-top: 1px solid ${COLORS["PRIMARY-20%"]};
  display: flex;
  height: 118px;
  justify-content: center;
`;

const DatesWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;

export {
  DatesWrapper,
  ModalFooter,
}