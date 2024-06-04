import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({
  id,
  text,
  type = 'default',
  onRemoveMessage,
}) {
  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container variant={type} onClick={handleRemoveToast}>
      {type === 'danger' && <img src={xCircleIcon} alt='X' />}
      {type === 'success' && <img src={checkCircleIcon} alt='Check' />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
  onRemoveMessage: PropTypes.func.isRequired,
};
