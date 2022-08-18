import React from 'react';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import BottomBtn from './components/BottomBtn.js';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // FileSearch的函数
  const onFileSearch = (value) => {
    console.log(value);
  };

  // FileList的函数
  const onFileClick = (id) => {
    console.log('file', id);
  };

  const onSaveEdit = (id, newValue) => {
    console.log(id, newValue);
  };

  const onFileDelete = (id) => {
    console.log('delete', id);
  };

  // TabList的函数
  const onTabClick = (id) => {
    console.log(id);
  };

  const onCloseTab = (id) => {
    console.log('close', id);
  };

  return (
    <div className="App container-fluid px-0">
      <div className='row row-cols-2'>
        <div className='col-3 bg-light left-panel pe-0'>
          <FileSearch title="My Cloud-Documents" onFileSearch={onFileSearch}/>
          <FileList
            files={defaultFiles}
            onFileClick={onFileClick}
            onFileDelete={onFileDelete}
            onSaveEdit={onSaveEdit}
          />
          <div className="row me-0">
            <div className='col d-grid g-0'>
              <BottomBtn text='新建' color='btn-primary' icon={faPlus} />
            </div>
            <div className='col d-grid g-0'>
              <BottomBtn text='导入' color='btn-success' icon={faFileImport} />
            </div>
          </div>
        </div>
        <div className='col-9 right-panel g-0'>
          <TabList
            files={defaultFiles}
            activeId={1}
            unsaveIds={[1, 2]}
            onTabClick={onTabClick}
            onCloseTab={onCloseTab}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
