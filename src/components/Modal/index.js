import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import Button from '../../components/Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal({ danger }) {
  return ReactDom.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza que deseja remover o contato "Nikolas Lopes"?</h1>

        <p>Esta ação não poderá ser desfeita!</p>

        <Footer>
          <button type='button' className='cancel-button'>
            Cancelar
          </button>
          <Button type='button' danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
