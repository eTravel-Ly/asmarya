import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './course.reducer';

export const CourseDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const courseEntity = useAppSelector(state => state.course.entity);
  const updateSuccess = useAppSelector(state => state.course.updateSuccess);

  const handleClose = () => {
    navigate('/course' + pageLocation.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(courseEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="courseDeleteDialogHeading">
        تأكيد عملية الحذف
      </ModalHeader>
      <ModalBody id="asmaryaApp.course.delete.question">هل أنت متأكد أنك تريد حذف الدورة {courseEntity.id}؟</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; إلغاء
        </Button>
        <Button id="jhi-confirm-delete-course" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; حذف
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CourseDeleteDialog;
