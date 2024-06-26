import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useDeferredValue,
} from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';

export function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const isMounted = useIsMounted();

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    );
  }, [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts({
          signal,
          orderBy,
        });

        setHasError(false);
        setContacts(contactsList);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setHasError(true);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [orderBy],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  useEffect(() => {
    if (!isLoading && isMounted()) {
      setIsHeaderVisible(true);
    }
  }, [isLoading, isMounted]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact({ id: contactBeingDeleted.id });

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
      handleCloseDeleteModal();
      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
      );
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isHeaderVisible,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    contacts,
    filteredContacts,
    hasError,
    searchTerm,
    orderBy,
    handleTryAgain,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  };
}
