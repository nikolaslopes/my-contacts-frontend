import { useEffect, useState } from 'react';
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

  useEffect(() => {
    async function loadContacts() {
      try {
        const contactData = await ContactsService.getContactById(id);

        console.log(contactData);

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

      <ContactForm buttonLabel='Salvar alterações' onSubmit={handleSubmit} />
    </>
  );
}
