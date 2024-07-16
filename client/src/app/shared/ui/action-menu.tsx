import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './action.scss'; // Import your CSS file for styles

export const ActionMenu = ({ route, item, paginationState }) => {
  return (
    <UncontrolledDropdown className="d-inline-block">
      <DropdownToggle caret={false} color="link" className="action-menu-toggle">
        <FontAwesomeIcon icon={faEllipsisV} className="action-menu-icon" />
      </DropdownToggle>
      <DropdownMenu left>
        <DropdownItem tag={Link} to={`/${route}/${item.id}`} className="text-end p-2">
          <FontAwesomeIcon icon={faEye} /> عرض
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to={`/${route}/${item.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
          data-cy="entityEditButton"
          className="text-end p-2"
        >
          <FontAwesomeIcon icon={faPencilAlt} /> تعديل
        </DropdownItem>
        <DropdownItem
          className="text-end p-2"
          onClick={() =>
            (window.location.href = `/${route}/${item.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
          }
          data-cy="entityDeleteButton"
        >
          <FontAwesomeIcon icon={faTrash} /> حذف
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
