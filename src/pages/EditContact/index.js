import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContactsService from '../../services/ContactsService';
import useIsMounted from '../../hooks/useIsMounted';
import toast from '../../utils/toast';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContacts() {
      try {
        const contactData = await ContactsService.getContactById(id);

        if (isMounted()) {
          setIsLoading(false);
          setContactName(contactData.name);
          contactFormRef.current.setFieldsValues(contactData);
        }
      } catch {
        if (isMounted()) {
          navigate('/', { replace: true });
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        }
      }
    }

    loadContacts();
  }, [id, isMounted, navigate]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.updateContact(id, contact);

      setContactName(contact.name);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel='Salvar alterações'
        onSubmit={handleSubmit}
      />
    </>
  );
}
