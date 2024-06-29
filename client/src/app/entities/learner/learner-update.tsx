import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ILearner } from 'app/shared/model/learner.model';
import { LearnerType } from 'app/shared/model/enumerations/learner-type.model';
import { getEntity, updateEntity, createEntity, reset } from './learner.reducer';

export const LearnerUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const learnerEntity = useAppSelector(state => state.learner.entity);
  const loading = useAppSelector(state => state.learner.loading);
  const updating = useAppSelector(state => state.learner.updating);
  const updateSuccess = useAppSelector(state => state.learner.updateSuccess);
  const learnerTypeValues = Object.keys(LearnerType);

  const handleClose = () => {
    navigate('/learner' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.birthYear !== undefined && typeof values.birthYear !== 'number') {
      values.birthYear = Number(values.birthYear);
    }

    const entity = {
      ...learnerEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          learnerType: 'EXTERNAL_STUDENT',
          ...learnerEntity,
          user: learnerEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.learner.home.createOrEditLabel" data-cy="LearnerCreateUpdateHeading">
            Create or edit a Learner
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="learner-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="First Name" id="learner-firstName" name="firstName" data-cy="firstName" type="text" />
              <ValidatedField label="Last Name" id="learner-lastName" name="lastName" data-cy="lastName" type="text" />
              <ValidatedField label="Birth Year" id="learner-birthYear" name="birthYear" data-cy="birthYear" type="text" />
              <ValidatedField label="Email" id="learner-email" name="email" data-cy="email" type="text" />
              <ValidatedField label="Mobile No" id="learner-mobileNo" name="mobileNo" data-cy="mobileNo" type="text" />
              <ValidatedField label="Google Id" id="learner-googleId" name="googleId" data-cy="googleId" type="text" />
              <ValidatedField label="Facebook Id" id="learner-facebookId" name="facebookId" data-cy="facebookId" type="text" />
              <ValidatedField label="Apple Id" id="learner-appleId" name="appleId" data-cy="appleId" type="text" />
              <ValidatedField label="Is Banned" id="learner-isBanned" name="isBanned" data-cy="isBanned" check type="checkbox" />
              <ValidatedField
                label="Verified By Email"
                id="learner-verifiedByEmail"
                name="verifiedByEmail"
                data-cy="verifiedByEmail"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Verified By Mobile No"
                id="learner-verifiedByMobileNo"
                name="verifiedByMobileNo"
                data-cy="verifiedByMobileNo"
                check
                type="checkbox"
              />
              <ValidatedBlobField label="Image File" id="learner-imageFile" name="imageFile" data-cy="imageFile" isImage accept="image/*" />
              <ValidatedField label="Image File Url" id="learner-imageFileUrl" name="imageFileUrl" data-cy="imageFileUrl" type="text" />
              <ValidatedField
                label="Nationality Code"
                id="learner-nationalityCode"
                name="nationalityCode"
                data-cy="nationalityCode"
                type="text"
              />
              <ValidatedField label="City" id="learner-city" name="city" data-cy="city" type="text" />
              <ValidatedField label="Address" id="learner-address" name="address" data-cy="address" type="text" />
              <ValidatedField label="Learner Type" id="learner-learnerType" name="learnerType" data-cy="learnerType" type="select">
                {learnerTypeValues.map(learnerType => (
                  <option value={learnerType} key={learnerType}>
                    {learnerType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Student Id" id="learner-studentId" name="studentId" data-cy="studentId" type="text" />
              <ValidatedField label="Notes" id="learner-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField id="learner-user" name="user" data-cy="user" label="User" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/learner" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LearnerUpdate;
