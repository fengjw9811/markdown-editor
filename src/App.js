import React, {useState, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons';
import SimpleMdeReact from 'react-simplemde-editor';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import BottomBtn from './components/BottomBtn.js';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';
import {flattenArr, objToArr} from './utils/helper';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';

const App = () => {
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      minHeight: '515px',
    };
  }, []);
  const [files, setFiles] = useState(flattenArr(defaultFiles));
  const [activeFileId, setActiveFileId] = useState(0);
  const [openedFileIds, setOpenedFileIds] = useState([]);
  const [unsavedFileIds, setUnsavedFileIds] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const filesArr = objToArr(files);
  const openedFiles = openedFileIds.map((openId) => {
    return files[openId];
  });
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr;
  const activeFile = files[activeFileId];

  // FileSearch的函数
  const searchFile = (keyword) => {
    const newFiles = filesArr.filter((file) => file.title.includes(keyword));
    setSearchedFiles(newFiles);
  };

  // FileList的函数
  const clickFile = (fileId) => {
    // 文件状态变为active
    setActiveFileId(fileId);
    // 文件状态变为打开(需要做限制)
    if (!openedFileIds.includes(fileId)) {
      setOpenedFileIds([...openedFileIds, fileId]);
    }
  };

  const updateFileName = (id, title) => {
    const modifiedFile = {...files[id], title, isNew: false};
    setFiles({...files, id: modifiedFile});
  };

  const deleteFile = (fileId) => {
    delete files[fileId];
    setFiles(files);
    closeTab(fileId);
  };

  // TabList的函数

  // 点击标签,文件状态变为active
  const clickTab = (fileId) => {
    setActiveFileId(fileId);
  };
  // 点击标签上的关闭按钮,将文件从openedFiles中删去(如果删去的是activeFile,则将打开文件的最后一个设为active)
  const closeTab = (fileId) => {
    const newOpenedFileIds = openedFileIds.filter(
        (openedFileId) => fileId!== openedFileId,
    );
    setOpenedFileIds(newOpenedFileIds);
    if (newOpenedFileIds.length > 0) {
      setActiveFileId(newOpenedFileIds[newOpenedFileIds.length - 1]);
    } else {
      setActiveFileId(0);
    }
  };

  // bottomBtn的函数
  const createNewFile = () => {
    const newId = uuidv4();
    const newFile = {
      id: newId,
      title: '',
      body: '## 请输入 Markdown',
      createdTime: Date.now(),
      isNew: true,
    };
    setFiles({...files, [newId]: newFile});
  };

  // markdown的函数

  // 编辑框中输入内容,改变file的body
  const fileChange = (id, value) => {
    // 改变files
    const newFile = {...files[id], body: value};
    setFiles({...files, [id]: newFile});
    // 将当前文件的状态置为unsaved
    if (!unsavedFileIds.includes(id)) {
      setUnsavedFileIds([...unsavedFileIds, id]);
    }
  };

  return (
    <div className="App container-fluid">
      <div className='row row-cols-2'>
        <div className='col-3 bg-light left-panel g-0 pe-0'>
          <FileSearch title="My Cloud-Documents" onFileSearch={searchFile}/>
          <FileList
            files={fileListArr}
            onFileClick={clickFile}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row button-group g-0">
            <div className='col d-grid'>
              <BottomBtn text='新建' color='btn-primary' icon={faPlus}
                onBtnClick={createNewFile}/>
            </div>
            <div className='col d-grid'>
              <BottomBtn text='导入' color='btn-success' icon={faFileImport}
                onBtnClick={createNewFile}/>
            </div>
          </div>
        </div>
        <div className='col-9 right-panel g-0'>
          {
            !activeFile && (
              <div className='start-page'>
                选择或者创建新的 Markdown 文档
              </div>
            )
          }
          {
            activeFile && (
              <>
                <TabList
                  files={openedFiles}
                  activeId={activeFileId}
                  unsaveIds={unsavedFileIds}
                  onTabClick={clickTab}
                  onCloseTab={closeTab}
                />
                <SimpleMdeReact
                  value={activeFile && activeFile.body}
                  onChange={(value) => {
                    fileChange(activeFileId, value);
                  }}
                  options={autofocusNoSpellcheckerOptions}
                />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
