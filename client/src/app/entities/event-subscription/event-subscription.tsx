import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, getPaginationState, JhiItemCount, JhiPagination, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './event-subscription.reducer';

export const EventSubscription = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const eventSubscriptionList = useAppSelector(state => state.eventSubscription.entities);
  const loading = useAppSelector(state => state.eventSubscription.loading);
  const totalItems = useAppSelector(state => state.eventSubscription.totalItems);

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
      <h2 id="event-subscription-heading" data-cy="EventSubscriptionHeading">
        Event Subscriptions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/event-subscription/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Event Subscription
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {eventSubscriptionList && eventSubscriptionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('fullName')}>
                  Full Name <FontAwesomeIcon icon={getSortIconByFieldName('fullName')} />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  Gender <FontAwesomeIcon icon={getSortIconByFieldName('gender')} />
                </th>
                <th className="hand" onClick={sort('birthDate')}>
                  Birth Date <FontAwesomeIcon icon={getSortIconByFieldName('birthDate')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  Email <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('mobileNo')}>
                  Mobile No <FontAwesomeIcon icon={getSortIconByFieldName('mobileNo')} />
                </th>
                <th className="hand" onClick={sort('city')}>
                  City <FontAwesomeIcon icon={getSortIconByFieldName('city')} />
                </th>
                <th className="hand" onClick={sort('nationalityCode')}>
                  Nationality Code <FontAwesomeIcon icon={getSortIconByFieldName('nationalityCode')} />
                </th>
                <th className="hand" onClick={sort('subscriptionStatus')}>
                  Subscription Status <FontAwesomeIcon icon={getSortIconByFieldName('subscriptionStatus')} />
                </th>
                <th className="hand" onClick={sort('results')}>
                  Results <FontAwesomeIcon icon={getSortIconByFieldName('results')} />
                </th>
                <th className="hand" onClick={sort('subscriberNotes')}>
                  Subscriber Notes <FontAwesomeIcon icon={getSortIconByFieldName('subscriberNotes')} />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon={getSortIconByFieldName('notes')} />
                </th>
                <th className="hand" onClick={sort('subscriptionDate')}>
                  Subscription Date <FontAwesomeIcon icon={getSortIconByFieldName('subscriptionDate')} />
                </th>
                <th className="hand" onClick={sort('attachmentUrl')}>
                  Attachment Url <FontAwesomeIcon icon={getSortIconByFieldName('attachmentUrl')} />
                </th>
                <th className="hand" onClick={sort('attachmentFile')}>
                  Attachment File <FontAwesomeIcon icon={getSortIconByFieldName('attachmentFile')} />
                </th>
                <th>
                  Event <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Learner <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventSubscriptionList.map((eventSubscription, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/event-subscription/${eventSubscription.id}`} color="link" size="sm">
                      {eventSubscription.id}
                    </Button>
                  </td>
                  <td>{eventSubscription.fullName}</td>
                  <td>{eventSubscription.gender}</td>
                  <td>{eventSubscription.birthDate}</td>
                  <td>{eventSubscription.email}</td>
                  <td>{eventSubscription.mobileNo}</td>
                  <td>{eventSubscription.city}</td>
                  <td>{eventSubscription.nationalityCode}</td>
                  <td>{eventSubscription.subscriptionStatus}</td>
                  <td>{eventSubscription.results}</td>
                  <td>{eventSubscription.subscriberNotes}</td>
                  <td>{eventSubscription.notes}</td>
                  <td>{eventSubscription.subscriptionDate}</td>
                  <td>{eventSubscription.attachmentUrl}</td>
                  <td>
                    {eventSubscription.attachmentFile ? (
                      <div>
                        {eventSubscription.attachmentFileContentType ? (
                          <a onClick={openFile(eventSubscription.attachmentFileContentType, eventSubscription.attachmentFile)}>
                            <img
                              src={`data:${eventSubscription.attachmentFileContentType};base64,${eventSubscription.attachmentFile}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {eventSubscription.attachmentFileContentType}, {byteSize(eventSubscription.attachmentFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {eventSubscription.event ? (
                      <Link to={`/event/${eventSubscription.event.id}`}>{eventSubscription.event.title}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {eventSubscription.learner ? (
                      <Link to={`/learner/${eventSubscription.learner.id}`}>{eventSubscription.learner.firstName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/event-subscription/${eventSubscription.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/event-subscription/${eventSubscription.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/event-subscription/${eventSubscription.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Event Subscriptions found</div>
        )}
      </div>
      {totalItems ? (
        <div className={eventSubscriptionList && eventSubscriptionList.length > 0 ? '' : 'd-none'}>
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

export default EventSubscription;
