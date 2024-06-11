import { Container } from './styles';

import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Container>
      <Link to='/'>
        <img src={logo} alt='MyContacts' width='201' />
      </Link>
    </Container>
  );
}
