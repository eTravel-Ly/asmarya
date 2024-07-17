import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { getPaginationState, JhiItemCount, JhiPagination, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './book.reducer';
import { BookAvailabilityCell, getGenreTranslation } from 'app/entities/book/enum-mapper';
import { ActionMenu } from 'app/shared/ui/action-menu';

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
        الكتب
        <div className="d-flex justify-content-end">
          {/*<Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>*/}
          {/*  <FontAwesomeIcon icon="sync" spin={loading} /> تحديث*/}
          {/*</Button>*/}
          <Link to="/book/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; إنشاء كتاب جديد
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bookList && bookList.length > 0 ? (
          <Table responsive striped>
            <thead>
              <tr>
                <th className="hand" onClick={() => sort('id')}>
                  # <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand"></th>
                <th className="hand" onClick={() => sort('title')}>
                  العنوان <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={() => sort('author')}>
                  المؤلف <FontAwesomeIcon icon={getSortIconByFieldName('author')} />
                </th>
                <th className="hand" onClick={() => sort('publicationDate')}>
                  تاريخ النشر <FontAwesomeIcon icon={getSortIconByFieldName('publicationDate')} />
                </th>
                {/*<th className="hand" onClick={() => sort('isbn')}>*/}
                {/*  رقم ISBN <FontAwesomeIcon icon={getSortIconByFieldName('isbn')}/>*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={() => sort('description')}>*/}
                {/*  الوصف <FontAwesomeIcon icon={getSortIconByFieldName('description')}/>*/}
                {/*</th>*/}
                <th className="hand" onClick={() => sort('genre')}>
                  النوع <FontAwesomeIcon icon={getSortIconByFieldName('genre')} />
                </th>
                {/*<th className="hand" onClick={() => sort('publisher')}>*/}
                {/*  الناشر <FontAwesomeIcon icon={getSortIconByFieldName('publisher')}/>*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={() => sort('pageCount')}>*/}
                {/*  عدد الصفحات <FontAwesomeIcon icon={getSortIconByFieldName('pageCount')}/>*/}
                {/*</th>*/}
                <th className="hand" onClick={() => sort('language')}>
                  اللغة <FontAwesomeIcon icon={getSortIconByFieldName('language')} />
                </th>
                {/*<th className="hand" onClick={() => sort('coverImageFile')}>*/}
                {/*  ملف الصورة الغلاف <FontAwesomeIcon icon={getSortIconByFieldName('coverImageFile')}/>*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={() => sort('coverImageUrl')}>*/}
                {/*  رابط الصورة الغلاف <FontAwesomeIcon icon={getSortIconByFieldName('coverImageUrl')}/>*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={() => sort('bookFile')}>*/}
                {/*  ملف الكتاب <FontAwesomeIcon icon={getSortIconByFieldName('bookFile')}/>*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={() => sort('bookUrl')}>*/}
                {/*  رابط الكتاب <FontAwesomeIcon icon={getSortIconByFieldName('bookUrl')}/>*/}
                {/*</th>*/}
                <th className="hand" onClick={() => sort('price')}>
                  السعر <FontAwesomeIcon icon={getSortIconByFieldName('price')} />
                </th>
                <th className="hand" onClick={() => sort('studentsPrice')}>
                  سعر الطلاب <FontAwesomeIcon icon={getSortIconByFieldName('studentsPrice')} />
                </th>
                <th className="hand" onClick={() => sort('numberOfBooksAvailable')}>
                  المتوفر
                  <FontAwesomeIcon icon={getSortIconByFieldName('numberOfBooksAvailable')} />
                </th>
                {/*<th className="hand" onClick={() => sort('keywords')}>*/}
                {/*  الكلمات الدالة <FontAwesomeIcon icon={getSortIconByFieldName('keywords')}/>*/}
                {/*</th>*/}
                <th className="hand" onClick={() => sort('bookAvailability')}>
                  الحالة <FontAwesomeIcon icon={getSortIconByFieldName('bookAvailability')} />
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
                  <td>
                    <a href={`/api/uploads/file/download/${book.coverImageUrl}`} target="_blank">
                      <img
                        className="img-fluid"
                        src={`/api/uploads/file/download/${book.coverImageUrl}`}
                        style={{ maxHeight: '60px' }}
                        alt=""
                      />
                    </a>
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    {book.publicationDate ? <TextFormat type="date" value={book.publicationDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  {/*<td>{book.isbn}</td>*/}
                  {/*<td>{book.description}</td>*/}
                  <td>{getGenreTranslation(book.genre)}</td>
                  {/*<td>{book.publisher}</td>*/}
                  {/*<td>{book.pageCount}</td>*/}
                  <td>{book.language == 'ARABIC' ? 'عربي' : 'انجليزي'}</td>
                  {/*<td>*/}
                  {/*  {book.coverImageFile ? (*/}
                  {/*    <div>*/}
                  {/*      {book.coverImageFileContentType ? (*/}
                  {/*        <a onClick={() => openFile(book.coverImageFileContentType, book.coverImageFile)}>*/}
                  {/*          <img*/}
                  {/*            src={`data:${book.coverImageFileContentType};base64,${book.coverImageFile}`}*/}
                  {/*            style={{maxHeight: '30px'}}*/}
                  {/*          />*/}
                  {/*          &nbsp;*/}
                  {/*        </a>*/}
                  {/*      ) : null}*/}
                  {/*      <span>*/}
                  {/*        {book.coverImageFileContentType}, {byteSize(book.coverImageFile)}*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  {/*<td>*/}
                  {/*  {book.bookFile ? (*/}
                  {/*    <div>*/}
                  {/*      {book.bookFileContentType ? (*/}
                  {/*        <a onClick={() => openFile(book.bookFileContentType, book.bookFile)}>*/}
                  {/*          <img src={`data:${book.bookFileContentType};base64,${book.bookFile}`}*/}
                  {/*               style={{maxHeight: '30px'}}/>*/}
                  {/*          &nbsp;*/}
                  {/*        </a>*/}
                  {/*      ) : null}*/}
                  {/*      <span>*/}
                  {/*        {book.bookFileContentType}, {byteSize(book.bookFile)}*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  {/*<td>{book.bookUrl}</td>*/}
                  <td>{book.price}</td>
                  <td>{book.studentsPrice}</td>
                  <td>{book.numberOfBooksAvailable}</td>
                  {/*<td>{book.keywords}</td>*/}
                  <BookAvailabilityCell status={book.bookAvailability} />

                  <td className="text-start">
                    <ActionMenu route={'book'} item={book} paginationState={paginationState} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">لم يتم العثور على كتب</div>
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
