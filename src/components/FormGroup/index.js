import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FormGroup({ children, error = null }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};
