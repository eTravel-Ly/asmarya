import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { getPaginationState, JhiItemCount, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSort, faSortDown, faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './category.reducer';
import { ActionMenu } from 'app/shared/ui/action-menu';

export const Category = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const categoryList = useAppSelector(state => state.category.entities);
  const loading = useAppSelector(state => state.category.loading);
  const totalItems = useAppSelector(state => state.category.totalItems);

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
      <h2 id="category-heading" data-cy="CategoryHeading">
        التصنيفات
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> نحديث
          </Button>
          <Link to="/category/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; إنشاء تصنيف جديدة
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {categoryList && categoryList.length > 0 ? (
          <Table responsive striped>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  # <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand"></th>
                <th className="hand" onClick={sort('nameAr')}>
                  الاسم بالعربية <FontAwesomeIcon icon={getSortIconByFieldName('nameAr')} />
                </th>
                <th className="hand" onClick={sort('nameEn')}>
                  الاسم بالإنجليزية <FontAwesomeIcon icon={getSortIconByFieldName('nameEn')} />
                </th>
                <th className="hand" onClick={sort('menuOrder')}>
                  ترتيب القائمة <FontAwesomeIcon icon={getSortIconByFieldName('menuOrder')} />
                </th>
                {/*<th className="hand" onClick={sort('imageFileUrl')}>*/}
                {/*  عنوان ملف الصورة <FontAwesomeIcon icon={getSortIconByFieldName('imageFileUrl')} />*/}
                {/*</th>*/}
                {/*<th className="hand" onClick={sort('imageFile')}>*/}
                {/*  ملف الصورة <FontAwesomeIcon icon={getSortIconByFieldName('imageFile')} />*/}
                {/*</th>*/}
                <th className="hand" onClick={sort('notes')}>
                  ملاحظات <FontAwesomeIcon icon={getSortIconByFieldName('notes')} />
                </th>
                <th className="hand" onClick={sort('isActive')}>
                  نشط <FontAwesomeIcon icon={getSortIconByFieldName('isActive')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/category/${category.id}`} color="link" size="sm">
                      {category.id}
                    </Button>
                  </td>
                  <td>
                    {category.imageFileUrl ? (
                      <img
                        src={`/api/uploads/file/download/${category.imageFileUrl}`}
                        alt={category.nameEn}
                        style={{ maxHeight: '60px' }}
                      />
                    ) : null}
                  </td>
                  <td>{category.nameAr}</td>
                  <td>{category.nameEn}</td>
                  <td>{category.menuOrder}</td>
                  {/*<td>{category.imageFileUrl}</td>*/}
                  {/*<td>*/}
                  {/*  {category.imageFile ? (*/}
                  {/*    <div>*/}
                  {/*      {category.imageFileContentType ? (*/}
                  {/*        <a onClick={openFile(category.imageFileContentType, category.imageFile)}>*/}
                  {/*          <img src={`data:${category.imageFileContentType};base64,${category.imageFile}`} style={{ maxHeight: '30px' }} />*/}
                  {/*          &nbsp;*/}
                  {/*        </a>*/}
                  {/*      ) : null}*/}
                  {/*      <span>*/}
                  {/*        {category.imageFileContentType}, {byteSize(category.imageFile)}*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  ) : null}*/}
                  {/*</td>*/}
                  <td>{category.notes}</td>
                  <td>
                    {category.isActive ? (
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="text-start">
                    <ActionMenu route={'category'} item={category} paginationState={paginationState} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">لا توجد فئات</div>
        )}
      </div>
      {totalItems ? (
        <div className={categoryList && categoryList.length > 0 ? '' : 'd-none'}>
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

export default Category;
