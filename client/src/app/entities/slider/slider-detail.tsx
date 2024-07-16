import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { byteSize, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './slider.reducer';

export const SliderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sliderEntity = useAppSelector(state => state.slider.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sliderDetailsHeading">Slider</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{sliderEntity.id}</dd>
          <dt>
            <span id="detailsAr">Details Ar</span>
          </dt>
          <dd>{sliderEntity.detailsAr}</dd>
          <dt>
            <span id="detailsEn">Details En</span>
          </dt>
          <dd>{sliderEntity.detailsEn}</dd>
          <dt>
            <span id="menuOrder">Menu Order</span>
          </dt>
          <dd>{sliderEntity.menuOrder}</dd>
          <dt>
            <span id="imageFileUrl">Image File Url</span>
          </dt>
          <dd>{sliderEntity.imageFileUrl}</dd>
          <dt>
            <span id="imageFile">Image File</span>
          </dt>
          <dd>
            {sliderEntity.imageFile ? (
              <div>
                {sliderEntity.imageFileContentType ? (
                  <a onClick={openFile(sliderEntity.imageFileContentType, sliderEntity.imageFile)}>
                    <img src={`data:${sliderEntity.imageFileContentType};base64,${sliderEntity.imageFile}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {sliderEntity.imageFileContentType}, {byteSize(sliderEntity.imageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="link">Link</span>
          </dt>
          <dd>{sliderEntity.link}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{sliderEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/slider" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/slider/${sliderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SliderDetail;
