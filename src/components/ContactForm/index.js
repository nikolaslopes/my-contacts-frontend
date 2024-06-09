import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { Form, ButtonContainer } from './styles';
import { useContactForm } from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    handleNameChange,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    categoryId,
    handleCategoryIdChange,
    isLoadingCategories,
    categories,
    getErrorMessagesByFieldName,
    isFormValid,
    handleSubmit,
    isSubmitting,
  } = useContactForm({ onSubmit, ref });

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessagesByFieldName('name')}>
        <Input
          placeholder='Nome *'
          value={name}
          onChange={handleNameChange}
          error={getErrorMessagesByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessagesByFieldName('email')}>
        <Input
          type='email'
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessagesByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder='Telefone'
          value={phone}
          onChange={handlePhoneChange}
          maxLength='15'
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={handleCategoryIdChange}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value=''> Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type='submit' disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
