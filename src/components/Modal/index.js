import Button from '../../components/Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>Tem certeza que deseja remover o contato "Nikolas Lopes"?</h1>

        <p>Esta ação não poderá ser desfeita!</p>

        <Footer>
          <button type='button' className='cancel-button'>
            Cancelar
          </button>
          <Button type='button'>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
