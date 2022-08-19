import React from 'react';
import PropsType from 'prop-types';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const TabList = (props) => {
  const {files, activeId, unsaveIds, onTabClick, onCloseTab} = props;
  return (
    <ul className='nav nav-pills tablist-component'>
      {
        files.map((file) => {
          const withUnsavedMark = unsaveIds.includes(file.id);
          const fClassname = classNames({
            'nav-link': true,
            'active': file.id === activeId,
          });
          return (
            <li className='nav-item' key={ file.id }>
              <a
                href="#"
                className={fClassname}
                onClick={() => onTabClick(file.id)}
              >
                {file.title}
                {
                  withUnsavedMark ? (
                    <span className='unsaved-span'>
                      <span className='rounded-circle ms-2 unsaved-icon' />
                      <span className='close-icon ms-2' onClick={
                        (e) => {
                          e.stopPropagation(); onCloseTab(file.id);
                        }
                      }>
                        <FontAwesomeIcon icon={faXmark} size='lg' />
                      </span>
                    </span>
                  ) : (
                    activeId === file.id ? (
                      <span className='close-icon-active ms-2' onClick={
                        (e) => {
                          e.stopPropagation(); onCloseTab(file.id);
                        }
                      }>
                        <FontAwesomeIcon icon={faXmark} size='lg' />
                      </span>
                    ) : (
                      <span className='saved-unactive-span'>
                        <span className='close-icon ms-2' onClick={
                          (e) => {
                            e.stopPropagation(); onCloseTab(file.id);
                          }
                        }>
                          <FontAwesomeIcon icon={faXmark} size='lg' />
                        </span>
                      </span>
                    )
                  )
                }
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};

TabList.propTypes = {
  files: PropsType.array,
  activeId: PropsType.string,
  unsaveIds: PropsType.array,
  onTabClick: PropsType.func,
  onCloseTab: PropsType.func,
};

TabList.defaultProps = {
  unsaveIds: [],
};

TabList.defaultProps = {
};

export default TabList;
