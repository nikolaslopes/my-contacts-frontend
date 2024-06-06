import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  const { id, text, type, duration = 7000 } = message;

  useEffect(() => {
    setTimeout(() => {
      console.log('set timeou exec');
      onRemoveMessage(id);
    }, duration);

    return () => {
      console.log('Desmonotou', id);
    };
  }, [id, duration, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container
      variant={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role='button'
    >
      {type === 'danger' && <img src={xCircleIcon} alt='X' />}
      {type === 'success' && <img src={checkCircleIcon} alt='Check' />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
