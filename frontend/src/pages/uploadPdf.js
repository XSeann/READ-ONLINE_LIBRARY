//React
import { useState } from "react"

//File Uploader
import { FileUploader } from "react-drag-drop-files"

//React Bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const fileTypes = ['PDF']

const UploadPdf = () => {
    const [title, setTitle] = useState('')
    const [strand, setStrand] = useState('')
    const [year, setYear] = useState('')
    const [author, setAuthors] = useState('')
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [error, setError] = useState('')
    const [submitErr, setSubmitErr] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    let authors = author.split('\n').toString()

    const handleChange = (e) => {
        setFileName(e)
        const reader = new FileReader()
        try {
            reader.readAsDataURL(e)
        }catch(error) {
            setFile('')
        }
        reader.onload = () => {
            setFile(reader.result) //base64encoded
            setError('')
        }
        reader.onerror = error => {
        }
    }

    const errorType = () => {
        setError('PDFTYPE')
    }

    const errorSize = () => {
        setError('PDFSIZE')
    }

    const uploadFile = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch('https://read-online-library-web.onrender.com/api/file', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, strand, year, authors, pdf: file})
        }) 
        
        const json = await response.json()

        if (!response.ok) {
            setSubmitErr(json.error)
            setIsLoading(false)
            alert(`You need to fill in the following: ${json.error}`)
        }

        if (response.ok) {
            setTitle('')
            setAuthors('')
            setStrand('')
            setYear('')
            setFile('')
            setFileName(null)
            setError('')
            setSubmitErr([])
            setIsLoading(false)
            alert('Your File will be check first before it will be uploaded. Thank You!')
        }
    }

    const dragStyle = {backgroundColor: 'green', fontSize: '2.5em', fontWeight: 'bold'}

    return(
        <div id="uploadPdf">
            <div id="uploadPdfSub"></div>
            <div id="uploadPdfSub2">
                <div id="uploadDetails">
                    <span></span>
                    <p>UPLOAD PDF</p>
                    <form onSubmit={uploadFile} disabled={isLoading}>
                        <span>TITLE: <input type='text' placeholder='Title Here...' onChange={e => setTitle(e.target.value)} value={title}/></span>
                        <span>
                            STRAND:
                            <Dropdown
                            id="filterStrand" 
                            as={ButtonGroup}>
                                <Button>{strand}</Button>
                                <Dropdown.Toggle split id="pickStrand" />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setStrand('ICT')} active={strand === 'ICT'}>ICT</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStrand('ABM')} active={strand === 'ABM'}>ABM</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStrand('STEM')} active={strand === 'STEM'}>STEM</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStrand('HUMMS')} active={strand === 'HUMMS'}>HUMMS</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStrand('CA')} active={strand === 'CA'}>CA</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStrand('TO')} active={strand === 'TO'}>TO</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </span>
                        <span>
                            YEAR:
                            <Dropdown
                            id="filterYear" 
                            as={ButtonGroup}>
                                <Button>{year}</Button>
                                <Dropdown.Toggle split id="pickYear" />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setYear('2023')} active={year === '2023'}>2023</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2022')} active={year === '2022'}>2022</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2021')} active={year === '2021'}>2021</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2020')} active={year === '2020'}>2020</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2019')} active={year === '2019'}>2019</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2018')} active={year === '2018'}>2018</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2017')} active={year === '2017'}>2017</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2016')} active={year === '2016'}>2016</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setYear('2015')} active={year === '2015'}>2015</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </span>
                       
                        <span>AUTHOR: <textarea placeholder='Author Here...' onChange={e => setAuthors(e.target.value)} value={author}/></span>
                        <button disabled={isLoading}>Publish</button>
                    </form>
                </div>
                <div id="uploadFile">
                    <span></span>
                    <FileUploader
                    multiple={false}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    onTypeError={errorType}
                    maxSize={10}
                    onSizeError={errorSize}
                    children={<div><span id="uploadBtnImg"></span><p>Drag and Drop File Here...</p></div>}
                    dropMessageStyle={dragStyle}
                    />
                    <p className={`${error !== '' && 'error'}`}>{error === '' ? (fileName ? `File Name: ${fileName.name}` : "No Files Uploaded Yet") : 
                    (error === 'PDFTYPE' ? 'PDF Files Only...' : 'Choose Files that are 10mb below...')}</p>
                </div>
            </div>
        </div>
    )
}

export default UploadPdf