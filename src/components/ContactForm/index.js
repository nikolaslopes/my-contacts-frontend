import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';

import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessagesByFieldName } = useErrors();

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      name,
      email,
      phone,
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessagesByFieldName('name')}>
        <Input
          placeholder='Nome'
          value={name}
          onChange={handleNameChange}
          error={getErrorMessagesByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessagesByFieldName('email')}>
        <Input
          type='email'
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessagesByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder='Telefone'
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=''>Categoria</option>
          <option value='instagram'>Instagram</option>
          <option value='discord'>Discord</option>
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
