import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, getPaginationState, JhiItemCount, JhiPagination, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './slider.reducer';
import { ActionMenu } from 'app/shared/ui/action-menu';

export const Slider = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const sliderList = useAppSelector(state => state.slider.entities);
  const loading = useAppSelector(state => state.slider.loading);
  const totalItems = useAppSelector(state => state.slider.totalItems);

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
      <h2 id="slider-heading" data-cy="SliderHeading">
        Sliders
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> نحديث
          </Button>
          <Link to="/slider/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Slider
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {sliderList && sliderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('detailsAr')}>
                  Details Ar <FontAwesomeIcon icon={getSortIconByFieldName('detailsAr')} />
                </th>
                <th className="hand" onClick={sort('detailsEn')}>
                  Details En <FontAwesomeIcon icon={getSortIconByFieldName('detailsEn')} />
                </th>
                <th className="hand" onClick={sort('menuOrder')}>
                  Menu Order <FontAwesomeIcon icon={getSortIconByFieldName('menuOrder')} />
                </th>
                <th className="hand" onClick={sort('imageFileUrl')}>
                  Image File Url <FontAwesomeIcon icon={getSortIconByFieldName('imageFileUrl')} />
                </th>
                <th className="hand" onClick={sort('imageFile')}>
                  Image File <FontAwesomeIcon icon={getSortIconByFieldName('imageFile')} />
                </th>
                <th className="hand" onClick={sort('link')}>
                  Link <FontAwesomeIcon icon={getSortIconByFieldName('link')} />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon={getSortIconByFieldName('notes')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sliderList.map((slider, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/slider/${slider.id}`} color="link" size="sm">
                      {slider.id}
                    </Button>
                  </td>
                  <td>{slider.detailsAr}</td>
                  <td>{slider.detailsEn}</td>
                  <td>{slider.menuOrder}</td>
                  <td>{slider.imageFileUrl}</td>
                  <td>
                    {slider.imageFile ? (
                      <div>
                        {slider.imageFileContentType ? (
                          <a onClick={openFile(slider.imageFileContentType, slider.imageFile)}>
                            <img src={`data:${slider.imageFileContentType};base64,${slider.imageFile}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {slider.imageFileContentType}, {byteSize(slider.imageFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{slider.link}</td>
                  <td>{slider.notes}</td>
                  <td className="text-start">
                    <ActionMenu route={'slider'} item={slider} paginationState={paginationState} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Sliders found</div>
        )}
      </div>
      {totalItems ? (
        <div className={sliderList && sliderList.length > 0 ? '' : 'd-none'}>
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

export default Slider;
