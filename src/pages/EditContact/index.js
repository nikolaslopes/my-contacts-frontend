import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  useEffect(() => {
    async function loadContacts() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contact);

        setIsLoading(false);
      } catch {
        navigate('/', { replace: true });
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }

    loadContacts();
  }, [id, navigate]);

  function handleSubmit() {}

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title='Editar Nikolas Lopes' />

      <ContactForm
        ref={contactFormRef}
        buttonLabel='Salvar alterações'
        onSubmit={handleSubmit}
      />
    </>
  );
}
