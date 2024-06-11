import { useHome } from './useHome';

import Loader from '../../components/Loader';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import SearchNotFound from './components/SearchNotFound';
import EmptyList from './components/EmptyList';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

import { Container } from './styles';

export default function Home() {
  const {
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
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty =
    !hasError && hasContacts && filteredContacts.length === 0;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      {isHeaderVisible && (
        <Header
          hasError={hasError}
          quantityOfContacts={contacts.length}
          quantityOfFilteredContacts={filteredContacts.length}
        />
      )}

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
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
