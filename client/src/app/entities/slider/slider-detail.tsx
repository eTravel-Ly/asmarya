import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
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

  // Prepare data to be displayed in the table
  const data = [
    { label: 'ID', value: sliderEntity.id },
    { label: 'التفاصيل بالعربية', value: sliderEntity.detailsAr },
    { label: 'التفاصيل بالإنجليزية', value: sliderEntity.detailsEn },
    { label: 'ترتيب القائمة', value: sliderEntity.menuOrder },
    { label: 'رابط صورة الملف', value: sliderEntity.imageFileUrl },
    { label: 'الرابط', value: sliderEntity.link },
    { label: 'ملاحظات', value: sliderEntity.notes },
    {
      label: 'صورة الملف',
      value: sliderEntity.imageFile ? (
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
      ) : null,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <h2 data-cy="sliderDetailsHeading">تفاصيل الشريط</h2>
        <Table striped>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>

      <Col md="12">
        <Button tag={Link} to="/slider" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
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
