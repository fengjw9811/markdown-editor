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
          {/* const fClassname = classNames({
            'nav-link': true,
            'active': file.id === activeId,
          }); */}
          return (
            <li className='' key={ file.id }>
              <a
                href="#"
                className='nav-link'
                onClick={() => onTabClick(file.id)}
              >
                {file.title}
                {
                  withUnsavedMark === file.id ? (
                    <span className='rounded-circle ms-2 unsaved-icon' />
                  ) : (
                    activeId === file.id ? (
                      <span className='ms-2' onClick={
                        (e) => {
                          e.stopPropagation(); onCloseTab(file.id);
                        }
                      }>
                        <FontAwesomeIcon icon={faXmark} size='lg' />
                      </span>
                    ) : null
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
  activeId: PropsType.number,
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
