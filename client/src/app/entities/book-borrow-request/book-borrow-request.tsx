import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './book-borrow-request.reducer';

export const BookBorrowRequest = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const bookBorrowRequestList = useAppSelector(state => state.bookBorrowRequest.entities);
  const loading = useAppSelector(state => state.bookBorrowRequest.loading);
  const totalItems = useAppSelector(state => state.bookBorrowRequest.totalItems);

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
      <h2 id="book-borrow-request-heading" data-cy="BookBorrowRequestHeading">
        Book Borrow Requests
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> نحديث
          </Button>
          <Link
            to="/book-borrow-request/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Book Borrow Request
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bookBorrowRequestList && bookBorrowRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('requestDate')}>
                  Request Date <FontAwesomeIcon icon={getSortIconByFieldName('requestDate')} />
                </th>
                <th className="hand" onClick={sort('collectDate')}>
                  Collect Date <FontAwesomeIcon icon={getSortIconByFieldName('collectDate')} />
                </th>
                <th className="hand" onClick={sort('returnDate')}>
                  Return Date <FontAwesomeIcon icon={getSortIconByFieldName('returnDate')} />
                </th>
                <th className="hand" onClick={sort('bookBorrowRequestStatus')}>
                  Book Borrow Request Status <FontAwesomeIcon icon={getSortIconByFieldName('bookBorrowRequestStatus')} />
                </th>
                <th>
                  Book <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Learner <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookBorrowRequestList.map((bookBorrowRequest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/book-borrow-request/${bookBorrowRequest.id}`} color="link" size="sm">
                      {bookBorrowRequest.id}
                    </Button>
                  </td>
                  <td>
                    {bookBorrowRequest.requestDate ? (
                      <TextFormat type="date" value={bookBorrowRequest.requestDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {bookBorrowRequest.collectDate ? (
                      <TextFormat type="date" value={bookBorrowRequest.collectDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {bookBorrowRequest.returnDate ? (
                      <TextFormat type="date" value={bookBorrowRequest.returnDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{bookBorrowRequest.bookBorrowRequestStatus}</td>
                  <td>
                    {bookBorrowRequest.book ? <Link to={`/book/${bookBorrowRequest.book.id}`}>{bookBorrowRequest.book.title}</Link> : ''}
                  </td>
                  <td>
                    {bookBorrowRequest.learner ? (
                      <Link to={`/learner/${bookBorrowRequest.learner.id}`}>{bookBorrowRequest.learner.firstName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/book-borrow-request/${bookBorrowRequest.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">عرض</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/book-borrow-request/${bookBorrowRequest.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/book-borrow-request/${bookBorrowRequest.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">No Book Borrow Requests found</div>
        )}
      </div>
      {totalItems ? (
        <div className={bookBorrowRequestList && bookBorrowRequestList.length > 0 ? '' : 'd-none'}>
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

export default BookBorrowRequest;
