import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, variant = 'default' }) {
  return (
    <Container variant={variant}>
      {variant === 'danger' && <img src={xCircleIcon} alt='X' />}
      {variant === 'success' && <img src={checkCircleIcon} alt='Check' />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'success', 'danger']),
};
