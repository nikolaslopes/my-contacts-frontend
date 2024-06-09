import PropTypes from 'prop-types';

import Button from '../../../../components/Button';

import { Container } from './styles';

import sadFace from '../../../../assets/images/sad-face.svg';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sadFace} alt='Sad Face' />
      <div className='error-details'>
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type='button' onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
