import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './center.reducer';

export const CenterDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const centerEntity = useAppSelector(state => state.center.entity);
  const updateSuccess = useAppSelector(state => state.center.updateSuccess);

  const handleClose = () => {
    navigate('/center' + pageLocation.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(centerEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose} dir="rtl">
      <ModalHeader toggle={handleClose} data-cy="centerDeleteDialogHeading">
        تأكيد عملية الحذف
      </ModalHeader>
      <ModalBody id="asmaryaApp.center.delete.question">هل أنت متأكد أنك تريد حذف المركز {centerEntity.id}؟</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; إلغاء
        </Button>
        <Button id="jhi-confirm-delete-center" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; حذف
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CenterDeleteDialog;
