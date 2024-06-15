import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { StyledButton } from './styles';

export default function Button({
  type = 'button',
  danger = false,
  children,
  isLoading = false,
  disabled = false,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      $danger={danger}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
