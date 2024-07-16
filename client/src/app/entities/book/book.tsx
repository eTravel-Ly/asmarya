import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './book.reducer';

export const Book = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const bookList = useAppSelector(state => state.book.entities);
  const loading = useAppSelector(state => state.book.loading);
  const totalItems = useAppSelector(state => state.book.totalItems);

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
      <h2 id="book-heading" data-cy="BookHeading">
        Books
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> نحديث
          </Button>
          <Link to="/book/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Book
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bookList && bookList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('title')}>
                  Title <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('author')}>
                  Author <FontAwesomeIcon icon={getSortIconByFieldName('author')} />
                </th>
                <th className="hand" onClick={sort('publicationDate')}>
                  Publication Date <FontAwesomeIcon icon={getSortIconByFieldName('publicationDate')} />
                </th>
                <th className="hand" onClick={sort('isbn')}>
                  Isbn <FontAwesomeIcon icon={getSortIconByFieldName('isbn')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('genre')}>
                  Genre <FontAwesomeIcon icon={getSortIconByFieldName('genre')} />
                </th>
                <th className="hand" onClick={sort('publisher')}>
                  Publisher <FontAwesomeIcon icon={getSortIconByFieldName('publisher')} />
                </th>
                <th className="hand" onClick={sort('pageCount')}>
                  Page Count <FontAwesomeIcon icon={getSortIconByFieldName('pageCount')} />
                </th>
                <th className="hand" onClick={sort('language')}>
                  Language <FontAwesomeIcon icon={getSortIconByFieldName('language')} />
                </th>
                <th className="hand" onClick={sort('coverImageFile')}>
                  Cover Image File <FontAwesomeIcon icon={getSortIconByFieldName('coverImageFile')} />
                </th>
                <th className="hand" onClick={sort('coverImageUrl')}>
                  Cover Image Url <FontAwesomeIcon icon={getSortIconByFieldName('coverImageUrl')} />
                </th>
                <th className="hand" onClick={sort('bookFile')}>
                  Book File <FontAwesomeIcon icon={getSortIconByFieldName('bookFile')} />
                </th>
                <th className="hand" onClick={sort('bookUrl')}>
                  Book Url <FontAwesomeIcon icon={getSortIconByFieldName('bookUrl')} />
                </th>
                <th className="hand" onClick={sort('price')}>
                  Price <FontAwesomeIcon icon={getSortIconByFieldName('price')} />
                </th>
                <th className="hand" onClick={sort('studentsPrice')}>
                  Students Price <FontAwesomeIcon icon={getSortIconByFieldName('studentsPrice')} />
                </th>
                <th className="hand" onClick={sort('numberOfBooksAvailable')}>
                  Number Of Books Available <FontAwesomeIcon icon={getSortIconByFieldName('numberOfBooksAvailable')} />
                </th>
                <th className="hand" onClick={sort('keywords')}>
                  Keywords <FontAwesomeIcon icon={getSortIconByFieldName('keywords')} />
                </th>
                <th className="hand" onClick={sort('bookAvailability')}>
                  Book Availability <FontAwesomeIcon icon={getSortIconByFieldName('bookAvailability')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookList.map((book, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/book/${book.id}`} color="link" size="sm">
                      {book.id}
                    </Button>
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    {book.publicationDate ? <TextFormat type="date" value={book.publicationDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{book.isbn}</td>
                  <td>{book.description}</td>
                  <td>{book.genre}</td>
                  <td>{book.publisher}</td>
                  <td>{book.pageCount}</td>
                  <td>{book.language}</td>
                  <td>
                    {book.coverImageFile ? (
                      <div>
                        {book.coverImageFileContentType ? (
                          <a onClick={openFile(book.coverImageFileContentType, book.coverImageFile)}>
                            <img
                              src={`data:${book.coverImageFileContentType};base64,${book.coverImageFile}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {book.coverImageFileContentType}, {byteSize(book.coverImageFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{book.coverImageUrl}</td>
                  <td>
                    {book.bookFile ? (
                      <div>
                        {book.bookFileContentType ? (
                          <a onClick={openFile(book.bookFileContentType, book.bookFile)}>
                            <img src={`data:${book.bookFileContentType};base64,${book.bookFile}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {book.bookFileContentType}, {byteSize(book.bookFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{book.bookUrl}</td>
                  <td>{book.price}</td>
                  <td>{book.studentsPrice}</td>
                  <td>{book.numberOfBooksAvailable}</td>
                  <td>{book.keywords}</td>
                  <td>{book.bookAvailability}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/book/${book.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">عرض</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/book/${book.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/book/${book.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">No Books found</div>
        )}
      </div>
      {totalItems ? (
        <div className={bookList && bookList.length > 0 ? '' : 'd-none'}>
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

export default Book;
