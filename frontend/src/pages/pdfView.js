import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePdf } from '@mikecousins/react-pdf'

//React Bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Spinner from 'react-bootstrap/Spinner'

const PdfView = () => {
    const [oneFile, setOneFile] = useState('')
    const [page, setPage] = useState(1)
    const [citation, setCitation] = useState('')
    const canvasRef = useRef(null)
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const getOneData = async () => {
            const response = await fetch(`http://localhost:7000/api/file/${id}`)
            const json = await response.json()
            setOneFile(json)
        }
        getOneData()
    }, [id])

    const { pdfDocument, pdfPage } = usePdf({
        file: oneFile.file || 'test.pdf',
        page,
        canvasRef,
    })

    const apa = oneFile !== '' && (oneFile.authors.split(',')[0] + '(' + oneFile.year + '). ' 
    + oneFile.title + '. https://read-online-library.netlify.app')

    const mla = oneFile !== '' && (oneFile.authors.split(',')[0] + '. "' + oneFile.title  + '." ' + 'read-online-library, ' + oneFile.year + ', ' 
    + 'read-online-library.netlify.app')

    const chicago = oneFile !== '' && (oneFile.authors.split(',')[0] + '. "' + oneFile.title  + '." ' + 'Read-online-library. ' + oneFile.year + '. ' 
    + 'https://read-online-library.netlify.app')

    const citationCopy = () => {
        navigator.clipboard.writeText(citation)
        alert('Reference has been copied!')
    }

    return(
        <div id="pdfViewer">
            <div className={`pdfView-${oneFile.strand}`}></div>
            <div id="pdfContainer">
            {oneFile === '' && <Spinner animation="border" variant="light" className="loadingSpin2"/> }
                <div id="overviewPdf">
                    <div id="overviewPdfView">
                        <canvas ref={canvasRef} className="PDF"/>
                        {oneFile !== '' && <div id="pdfDetails">
                            <h1>Research of {oneFile.strand} Students in STI Fairview</h1>
                            <h4>STRAND: {oneFile.strand}</h4>
                            <h4>YEAR PUBLISHED: ({oneFile.year})</h4>
                            <h4>AUTHORS: {oneFile.authors}</h4>
                            {citation !== '' && <span onClick={citationCopy}>REFERENCE: {citation}</span>}
                        </div>}
                    </div>
                    <div id="overviewPdfButtons">
                        <div id="pdfViewButton">
                            {oneFile !== '' && <Link to={`/pdfView2/${oneFile._id}`}>View PDF</Link>}
                        </div>
                        <div id="citationButton">
                            {oneFile !== '' && <Dropdown
                            id="citationFilter" 
                            as={ButtonGroup}>
                            <Button>Citations</Button>
                            <Dropdown.Toggle split id="" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setCitation(apa)} active={apa === citation}>APA</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCitation(mla)} active={mla === citation}>MLA</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCitation(chicago)} active={chicago === citation}>Chicago</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>}
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfView