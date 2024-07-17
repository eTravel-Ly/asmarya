import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, getPaginationState, JhiItemCount, JhiPagination, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './learner.reducer';
import { ActionMenu } from 'app/shared/ui/action-menu';

export const Learner = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const learnerList = useAppSelector(state => state.learner.entities);
  const loading = useAppSelector(state => state.learner.loading);
  const totalItems = useAppSelector(state => state.learner.totalItems);

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
      <h2 id="learner-heading" data-cy="LearnerHeading">
        المتعلمون
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> نحديث
          </Button>
          <Link to="/learner/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; إنشاء متعلم جديد
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {learnerList && learnerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  المعرف <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  الاسم الأول <FontAwesomeIcon icon={getSortIconByFieldName('firstName')} />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  اسم العائلة <FontAwesomeIcon icon={getSortIconByFieldName('lastName')} />
                </th>
                <th className="hand" onClick={sort('birthYear')}>
                  سنة الميلاد <FontAwesomeIcon icon={getSortIconByFieldName('birthYear')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  البريد الإلكتروني <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('mobileNo')}>
                  رقم الجوال <FontAwesomeIcon icon={getSortIconByFieldName('mobileNo')} />
                </th>
                <th className="hand" onClick={sort('googleId')}>
                  Google Id <FontAwesomeIcon icon={getSortIconByFieldName('googleId')} />
                </th>
                <th className="hand" onClick={sort('facebookId')}>
                  Facebook Id <FontAwesomeIcon icon={getSortIconByFieldName('facebookId')} />
                </th>
                <th className="hand" onClick={sort('appleId')}>
                  Apple Id <FontAwesomeIcon icon={getSortIconByFieldName('appleId')} />
                </th>
                <th className="hand" onClick={sort('isBanned')}>
                  محظور <FontAwesomeIcon icon={getSortIconByFieldName('isBanned')} />
                </th>
                <th className="hand" onClick={sort('verifiedByEmail')}>
                  تم التحقق من البريد الإلكتروني <FontAwesomeIcon icon={getSortIconByFieldName('verifiedByEmail')} />
                </th>
                <th className="hand" onClick={sort('verifiedByMobileNo')}>
                  تم التحقق من رقم الجوال <FontAwesomeIcon icon={getSortIconByFieldName('verifiedByMobileNo')} />
                </th>
                <th className="hand" onClick={sort('imageFile')}>
                  ملف الصورة <FontAwesomeIcon icon={getSortIconByFieldName('imageFile')} />
                </th>
                <th className="hand" onClick={sort('imageFileUrl')}>
                  رابط ملف الصورة <FontAwesomeIcon icon={getSortIconByFieldName('imageFileUrl')} />
                </th>
                <th className="hand" onClick={sort('nationalityCode')}>
                  رمز الجنسية <FontAwesomeIcon icon={getSortIconByFieldName('nationalityCode')} />
                </th>
                <th className="hand" onClick={sort('city')}>
                  المدينة <FontAwesomeIcon icon={getSortIconByFieldName('city')} />
                </th>
                <th className="hand" onClick={sort('address')}>
                  العنوان <FontAwesomeIcon icon={getSortIconByFieldName('address')} />
                </th>
                <th className="hand" onClick={sort('learnerType')}>
                  نوع المتعلم <FontAwesomeIcon icon={getSortIconByFieldName('learnerType')} />
                </th>
                <th className="hand" onClick={sort('studentId')}>
                  معرف الطالب <FontAwesomeIcon icon={getSortIconByFieldName('studentId')} />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  ملاحظات <FontAwesomeIcon icon={getSortIconByFieldName('notes')} />
                </th>
                <th>
                  المستخدم <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {learnerList.map((learner, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/learner/${learner.id}`} color="link" size="sm">
                      {learner.id}
                    </Button>
                  </td>
                  <td>{learner.firstName}</td>
                  <td>{learner.lastName}</td>
                  <td>{learner.birthYear}</td>
                  <td>{learner.email}</td>
                  <td>{learner.mobileNo}</td>
                  <td>{learner.googleId}</td>
                  <td>{learner.facebookId}</td>
                  <td>{learner.appleId}</td>
                  <td>{learner.isBanned ? 'نعم' : 'لا'}</td>
                  <td>{learner.verifiedByEmail ? 'نعم' : 'لا'}</td>
                  <td>{learner.verifiedByMobileNo ? 'نعم' : 'لا'}</td>
                  <td>
                    {learner.imageFile ? (
                      <div>
                        {learner.imageFileContentType ? (
                          <a onClick={openFile(learner.imageFileContentType, learner.imageFile)}>
                            <img src={`data:${learner.imageFileContentType};base64,${learner.imageFile}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {learner.imageFileContentType}, {byteSize(learner.imageFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{learner.imageFileUrl}</td>
                  <td>{learner.nationalityCode}</td>
                  <td>{learner.city}</td>
                  <td>{learner.address}</td>
                  <td>{learner.learnerType}</td>
                  <td>{learner.studentId}</td>
                  <td>{learner.notes}</td>
                  <td>{learner.user ? learner.user.id : ''}</td>

                  <td className="text-start">
                    <ActionMenu route={'learner'} item={learner} paginationState={paginationState} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">لا توجد متعلمون</div>
        )}
      </div>
      {totalItems ? (
        <div className={learnerList && learnerList.length > 0 ? '' : 'd-none'}>
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

export default Learner;
