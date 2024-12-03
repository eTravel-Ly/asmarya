import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Table } from 'reactstrap';
import { getPaginationState, JhiItemCount, JhiPagination, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSort, faSortDown, faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './event.reducer';
import { translateEventType } from 'app/entities/book/enum-mapper';

export const Event = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const eventList = useAppSelector(state => state.event.entities);
  const loading = useAppSelector(state => state.event.loading);
  const totalItems = useAppSelector(state => state.event.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="event-heading" data-cy="EventHeading">
        الأحداث
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> تحديث القائمة
          </Button>
          <Link to="/event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; إنشاء حدث جديد
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {eventList && eventList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th></th>
                <th className="hand" onClick={sort('title')}>
                  العنوان <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('organizer')}>
                  المنظم <FontAwesomeIcon icon={getSortIconByFieldName('organizer')} />
                </th>
                <th className="hand" onClick={sort('address')}>
                  العنوان <FontAwesomeIcon icon={getSortIconByFieldName('address')} />
                </th>
                {/*<th className="hand" onClick={sort('description')}>*/}
                {/*  الوصف <FontAwesomeIcon icon={getSortIconByFieldName('description')} />*/}
                {/*</th>*/}
                <th className="hand" onClick={sort('eventType')}>
                  نوع الحدث <FontAwesomeIcon icon={getSortIconByFieldName('eventType')} />
                </th>
                <th className="hand" onClick={sort('participationType')}>
                  نوع المشاركة <FontAwesomeIcon icon={getSortIconByFieldName('participationType')} />
                </th>
                <th className="hand" onClick={sort('eventStartDate')}>
                  تاريخ بدء الحدث <FontAwesomeIcon icon={getSortIconByFieldName('eventStartDate')} />
                </th>
                <th className="hand" onClick={sort('eventEndDate')}>
                  تاريخ نهاية الحدث <FontAwesomeIcon icon={getSortIconByFieldName('eventEndDate')} />
                </th>
                {/*<th className="hand" onClick={sort('applyStartDate')}>*/}
                {/*  تاريخ بدء التقديم <FontAwesomeIcon icon={getSortIconByFieldName('applyStartDate')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('applyEndDate')}>*/}
                {/*  تاريخ انتهاء التقديم <FontAwesomeIcon icon={getSortIconByFieldName('applyEndDate')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('abstractApplyEndDate')}>*/}
                {/*  تاريخ انتهاء تقديم الملخص <FontAwesomeIcon icon={getSortIconByFieldName('abstractApplyEndDate')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('papersReplayDate')}>*/}
                {/*  تاريخ إعادة تقديم الأوراق <FontAwesomeIcon icon={getSortIconByFieldName('papersReplayDate')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('enrollmentEndDate')}>*/}
                {/*  تاريخ انتهاء التسجيل <FontAwesomeIcon icon={getSortIconByFieldName('enrollmentEndDate')} />*/}
                {/*</th>*/}
                <th className="hand" onClick={sort('contactMobile')}>
                  هاتف الاتصال <FontAwesomeIcon icon={getSortIconByFieldName('contactMobile')} />
                </th>
                {/*<th className="hand" onClick={sort('contactWhatsApp')}>*/}
                {/*  واتس آب الاتصال <FontAwesomeIcon icon={getSortIconByFieldName('contactWhatsApp')} />*/}
                {/*</th>*/}
                <th className="hand" onClick={sort('contactWebsite')}>
                  موقع الاتصال <FontAwesomeIcon icon={getSortIconByFieldName('contactWebsite')} />
                </th>
                <th className="hand" onClick={sort('contactEmail')}>
                  بريد الاتصال الإلكتروني <FontAwesomeIcon icon={getSortIconByFieldName('contactEmail')} />
                </th>
                {/*<th className="hand" onClick={sort('conditions')}>*/}
                {/*  الشروط <FontAwesomeIcon icon={getSortIconByFieldName('conditions')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('notes')}>*/}
                {/*  الملاحظات <FontAwesomeIcon icon={getSortIconByFieldName('notes')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('coverImageFile')}>*/}
                {/*  ملف صورة الغلاف <FontAwesomeIcon icon={getSortIconByFieldName('coverImageFile')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('coverImageUrl')}>*/}
                {/*  رابط صورة الغلاف <FontAwesomeIcon icon={getSortIconByFieldName('coverImageUrl')} />*/}
                {/*</th>*/}
                <th className="hand" onClick={sort('isActive')}>
                  مفعل <FontAwesomeIcon icon={getSortIconByFieldName('isActive')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventList.map((event, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/event/${event.id}`} color="link" size="sm">
                      {event.id}
                    </Button>
                  </td>
                  <td>
                    {event.coverImageUrl ? (
                      <img src={`/api/uploads/file/download/${event.coverImageUrl}`} alt={event.id} style={{ maxHeight: '60px' }} />
                    ) : null}
                  </td>
                  <td>{event.title}</td>
                  <td>{event.organizer}</td>
                  <td>{event.address}</td>
                  {/*<td>{event.description}</td>*/}
                  <td>
                    <Badge>{translateEventType(event.eventType)}</Badge>
                  </td>
                  <td>{event.participationType}</td>
                  <td>
                    {event.eventStartDate ? <TextFormat type="date" value={event.eventStartDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {event.eventEndDate ? <TextFormat type="date" value={event.eventEndDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  {/*<td>*/}
                  {/*  {event.applyStartDate ? <TextFormat type="date" value={event.applyStartDate} format={APP_LOCAL_DATE_FORMAT} /> : null}*/}
                  {/*</td>*/}
                  {/*<td>*/}
                  {/*  {event.applyEndDate ? <TextFormat type="date" value={event.applyEndDate} format={APP_LOCAL_DATE_FORMAT} /> : null}*/}
                  {/*</td>*/}
                  {/*<td>*/}
                  {/*  {event.abstractApplyEndDate ? (*/}
                  {/*    <TextFormat type="date" value={event.abstractApplyEndDate} format={APP_LOCAL_DATE_FORMAT} />*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  {/*<td>*/}
                  {/*  {event.papersReplayDate ? (*/}
                  {/*    <TextFormat type="date" value={event.papersReplayDate} format={APP_LOCAL_DATE_FORMAT} />*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  {/*<td>*/}
                  {/*  {event.enrollmentEndDate ? (*/}
                  {/*    <TextFormat type="date" value={event.enrollmentEndDate} format={APP_LOCAL_DATE_FORMAT} />*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  <td>{event.contactMobile}</td>
                  {/*<td>{event.contactWhatsApp}</td>*/}
                  <td>{event.contactWebsite}</td>
                  <td>{event.contactEmail}</td>
                  {/*<td>{event.conditions}</td>*/}
                  {/*<td>{event.notes}</td>*/}
                  {/*<td>*/}
                  {/*  {event.coverImageFile ? (*/}
                  {/*    <div>*/}
                  {/*      {event.coverImageFileContentType ? (*/}
                  {/*        <a onClick={openFile(event.coverImageFileContentType, event.coverImageFile)}>*/}
                  {/*          <img*/}
                  {/*            src={`data:${event.coverImageFileContentType};base64,${event.coverImageFile}`}*/}
                  {/*            style={{ maxHeight: '30px' }}*/}
                  {/*          />*/}
                  {/*          &nbsp;*/}
                  {/*        </a>*/}
                  {/*      ) : null}*/}
                  {/*      <span>*/}
                  {/*        {event.coverImageFileContentType}, {byteSize(event.coverImageFile)}*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  {/*<td>{event.coverImageUrl}</td>*/}
                  <td>
                    {event.isActive ? (
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/event/${event.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">عرض</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/event/${event.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/event/${event.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">حذف</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">لم يتم العثور على أحداث</div>
        )}
      </div>
      {totalItems ? (
        <div className={eventList && eventList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Event;
