import React from 'react';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const onFileSearch = (value) => {
    console.log(value);
  };

  const onFileClick = (id) => {
    console.log(id);
  };

  const onSaveEdit = (id) => {
    console.log(id);
  };

  const onFileDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col bg-light left-panel'>
          <FileSearch title="My Cloud-Documents" onFileSearch={onFileSearch}/>
          <FileList
            files={defaultFiles}
            onFileClick={onFileClick}
            onFileDelete={onFileDelete}
            onSaveEdit={onSaveEdit}
          />
        </div>
        <div className='col bg-primary right-panel'>
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
