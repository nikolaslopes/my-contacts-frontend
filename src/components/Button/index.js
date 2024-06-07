import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { StyledButton } from './styles';

export default function Button({
  type = 'button',
  danger = false,
  disabled = false,
  isLoading = false,
  children,
  onClick = undefined,
}) {
  return (
    <StyledButton
      type={type}
      danger={danger}
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
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
