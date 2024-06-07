import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay } from './styles';
import Spinner from '../Spinner';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return ReactDom.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    container,
  );
}

Loader.propTypes = {
  isLoadind: PropTypes.bool.isRequired,
};
