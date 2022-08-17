import { useState, useEffect } from 'react'

const FileSearch = (props) => {
  const { title, onFileSearch } = props
  console.log(onFileSearch)
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')

  const closeSearch = (e) => {
    e.preventDefault()
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keycode } = event
      if (keycode === 13 && inputActive) {
        onFileSearch(value)
      } else if (keycode === 27 && inputActive) {
        closeSearch()
      }
    }
  })
  return (
    <div className='alert alert-primary'>
        {
            !inputActive && (
                <div className='d-flex justify-content-between align-items-center'>
                    <span>{title}</span>
                    <button type='button' className='btn btn-primary' onClick={() => setInputActive(true)}>搜索</button>
                </div>
            )
        }
        {
            inputActive && (
                <div className='row'>
                    <div className='col-8'>
                        <input className='form-control' value={value} onChange={(e) => setValue(e.target.value)}/>
                    </div>
                    <button type='button' className='btn btn-primary col-4' onClick={() => setInputActive(false)}>关闭</button>
                </div>
            )
        }
    </div>
  )
}

export default FileSearch
