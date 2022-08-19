import {useState, useEffect, useRef} from 'react';
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
  const closeSearch = (editItem) => {
    setEditStatus(0);
    setValue('');
    // 关闭输入框时,应该删除当前编辑的文件
    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };
  const input = useRef(null);

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit(editItem.id, value);
      setEditStatus(0);
      setValue('');
    }
    if (escPressed && editStatus) {
      closeSearch(editItem);
    }
  });

  useEffect(() => {
    if (editStatus) {
      input.current.focus();
    }
  }, [editStatus]);

  return (
    <ul className='list-group list-ground-flush file-list'>
      {
        files.map((file) => (
          <li
            className='list-group-item bg-light
                      d-flex align-items-center file-item'
            key={file.id}>
            {
              (file.id === editStatus || file.isNew) ? (
                <>
                  <div className='col-10'>
                    <input
                      className='form-control'
                      placeholder='请输入文件名称'
                      ref={input}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <button
                    type='button'
                    className='icon-button col-2'
                    onClick={() => closeSearch(file)}
                  >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                  </button>
                </>
              ) : (
                <>
                  <span className='col-2'>
                    <FontAwesomeIcon icon={faMarkdown} size='lg' />
                  </span>
                  <span className='col-7 c-link'
                    onClick={() => onFileClick(file.id)}>
                    {file.title}
                  </span>
                  <button className='icon-button col-2' onClick={() => {
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
