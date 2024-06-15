import PropTypes from 'prop-types';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import ReactPortal from '../ReactPortal';
import Button from '../../components/Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal({
  visible,
  title,
  children,
  onCancel,
  onConfirm,
  danger = false,
  isLoading = false,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId='modal-root'>
      <Overlay $isLeaving={!visible} ref={animatedElementRef}>
        <Container $danger={danger}>
          <h1>{title}</h1>

          <div className='modal-body'>{children}</div>

          <Footer>
            <button
              type='button'
              className='cancel-button'
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type='button'
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
};
