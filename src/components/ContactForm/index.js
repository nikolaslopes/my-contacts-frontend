import PropTypes from 'prop-types';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder='Nome' />
      </FormGroup>
      <FormGroup>
        <Input placeholder='E-mail' />
      </FormGroup>
      <FormGroup>
        <Input placeholder='Telefone' />
      </FormGroup>
      <FormGroup>
        <Select>
          <option value='instagram'>Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type='submit'>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
