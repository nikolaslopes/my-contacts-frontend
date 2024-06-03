import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessage text='Default toast' />
      <ToastMessage text='Error toast' variant='danger' />
      <ToastMessage text='Success toast' variant='success' />
    </Container>
  );
}
