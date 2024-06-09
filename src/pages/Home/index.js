import { Link } from 'react-router-dom';

import { useHome } from './useHome';

import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

import InputSearch from './components/InputSearch';

import {
  Container,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  SearchNotFoundContainer,
  EmptyListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sadFace from '../../assets/images/sad-face.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnfierQuestion from '../../assets/images/magnifier-question.svg';

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
        $justifyContent={
          hasError
            ? 'flex-end'
            : contacts.length > 0
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to='/new'>Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sadFace} alt='Sad Face' />
          <div className='error-details'>
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type='button' onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt='Empty box' />

              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader $orderBy={orderBy}>
              <button type='button' onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt='Arrow' />
              </button>
            </ListHeader>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnfierQuestion} alt='Magnifier question' />
              <span>
                Nenhum resultado foi encontrado para{' '}
                <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className='info'>
                <div className='contact-name'>
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className='actions'>
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt='Edit' />
                </Link>
                <button
                  type='button'
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt='Delete' />
                </button>
              </div>
            </Card>
          ))}

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
