import React from 'react';
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import useKeyPress from '../../hooks/useKeyPress';

const FileSearch = (props) => {
  const {title, onFileSearch} = props;
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const input = useRef(null);

  const closeSearch = () => {
    setInputActive(false);
    setValue('');
    onFileSearch('');
  };

  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
  });

  // 实现input框的自动focus
  useEffect(() => {
    if (inputActive) {
      input.current.focus();
    }
  }, [inputActive]);

  return (
    <div className='alert alert-primary d-flex
    justify-content-between align-items-center mb-0 mx-0'>
      {
        inputActive ? (
          <>
            <input
              className='form-control'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={input}
            />
            <button
              type='button'
              className='icon-button'
              onClick={closeSearch}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </>
        ) : (
          <>
            <span>{title}</span>
            <button
              type='button'
              className='icon-button'
              onClick={() => setInputActive(true)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} title="搜索" size='lg'/>
            </button>
          </>
        )
      }
    </div>
  );
};

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title: '我的云文档',
};

export default FileSearch;
