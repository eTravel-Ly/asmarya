import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './book-borrow-request.reducer';

export const BookBorrowRequestDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const bookBorrowRequestEntity = useAppSelector(state => state.bookBorrowRequest.entity);
  const updateSuccess = useAppSelector(state => state.bookBorrowRequest.updateSuccess);

  const handleClose = () => {
    navigate('/book-borrow-request' + pageLocation.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(bookBorrowRequestEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="bookBorrowRequestDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="asmaryaApp.bookBorrowRequest.delete.question">
        Are you sure you want to delete Book Borrow Request {bookBorrowRequestEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; الغاء
        </Button>
        <Button id="jhi-confirm-delete-bookBorrowRequest" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; حذف
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BookBorrowRequestDeleteDialog;
