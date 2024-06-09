import { useHome } from './useHome';
import Loader from '../../components/Loader';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import SearchNotFound from './components/SearchNotFound';
import EmptyList from './components/EmptyList';
import Modal from '../../components/Modal';

import { Container } from './styles';

import ContactsList from './components/ContactsList';

export default function Home() {
  const {
    isLoading,
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
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {!hasError && contacts.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && <EmptyList />}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel='Deletar'
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
