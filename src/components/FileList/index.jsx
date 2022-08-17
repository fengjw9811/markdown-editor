import {useState, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faMarkdown} from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

const FileList = (props) => {
  const {files, onFileClick, onSaveEdit, onFileDelete} = props;
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState('');
  return (
    <ul className='list-group list-ground-flush file-list'>
      {
        files.map((file) => (
          <li
            className='list-group-item bg-light row
            d-flex align-items-center file-item'
            key={file.id}>
            <span className='col-2'>
              <FontAwesomeIcon icon={faMarkdown} size='lg' />
            </span>
            <span className='col-8 c-link' onClick={() =>onFileClick(file.id)}>
              {file.title}
            </span>
            <button className='icon-button col-1' onClick={() => {
              onSaveEdit(file.id); setValue(file.title);
            }}>
              <FontAwesomeIcon title='编辑' icon={faPen} size='lg' />
            </button>
            <button className='icon-button col-1' onClick={() => {
              onFileDelete(file.id);
            }}>
              <FontAwesomeIcon title='删除' icon={faTrash} size='lg' />
            </button>
          </li>
        ))
      }
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onSaveEdit: PropTypes.func,
  onFileDelete: PropTypes.func,
};

export default FileList;
