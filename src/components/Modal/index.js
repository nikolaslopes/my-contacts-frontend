import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import Button from '../../components/Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal({
  visible,
  danger = false,
  title,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
}) {
  if (!visible) {
    return null;
  }

  return ReactDom.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        <div className='modal-body'>{children}</div>

        <Footer>
          <button type='button' className='cancel-button' onClick={onCancel}>
            {cancelLabel}
          </button>
          <Button type='button' danger={danger} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
