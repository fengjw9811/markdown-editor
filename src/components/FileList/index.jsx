import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons';
import {faMarkdown} from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../../hooks/useKeyPress';

const FileList = (props) => {
  const {files, onFileClick, onSaveEdit, onFileDelete} = props;
  const [editStatus, setEditStatus] = useState(0);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const closeSearch = () => {
    setEditStatus(0);
    setValue('');
  };

  useEffect(() => {
    if (enterPressed && editStatus) {
      const editItem = files.find((file) => file.id === editStatus);
      onSaveEdit(editItem.id, value);
      setEditStatus(0);
      setValue('');
    }
    if (escPressed && editStatus) {
      closeSearch();
    }
  });

  return (
    <ul className='list-group list-ground-flush file-list'>
      {
        files.map((file) => (
          <li
            className='list-group-item bg-light
            d-flex align-items-center file-item'
            key={file.id}>
            {
              file.id === editStatus ? (
                <>
                  <div className='col-10'>
                    <input
                      className='form-control'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <button
                    type='button'
                    className='icon-button col-2'
                    onClick={closeSearch}
                  >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                  </button>
                </>
              ) : (
                <>
                  <span className='col-2'>
                    <FontAwesomeIcon icon={faMarkdown} size='lg' />
                  </span>
                  <span className='col-8 c-link'
                    onClick={() => onFileClick(file.id)}>
                    {file.title}
                  </span>
                  <button className='icon-button col-1' onClick={() => {
                    setEditStatus(file.id); setValue(file.title);
                  }}>
                    <FontAwesomeIcon title='编辑' icon={faPen} size='lg' />
                  </button>
                  <button className='icon-button col-1' onClick={() => {
                    onFileDelete(file.id);
                  }}>
                    <FontAwesomeIcon title='删除' icon={faTrash} size='lg' />
                  </button>
                </>
              )
            }
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
