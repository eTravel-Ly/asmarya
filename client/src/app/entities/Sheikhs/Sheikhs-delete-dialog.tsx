import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './Sheikhs.reducer';

export const LearnerDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const learnerEntity = useAppSelector(state => state.learner.entity);
  const updateSuccess = useAppSelector(state => state.learner.updateSuccess);

  const handleClose = () => {
    navigate('/learner' + pageLocation.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(learnerEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="learnerDeleteDialogHeading">
        تأكيد عملية الحذف
      </ModalHeader>
      <ModalBody id="asmaryaApp.learner.delete.question">هل أنت متأكد أنك تريد حذف المتعلم {learnerEntity.id}؟</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; إلغاء
        </Button>
        <Button id="jhi-confirm-delete-learner" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; حذف
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LearnerDeleteDialog;
