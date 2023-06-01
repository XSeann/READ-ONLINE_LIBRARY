import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePdf } from '@mikecousins/react-pdf'

//React Bootstrap
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const PdfViewAdmin = () => {
    const [oneFile, setOneFile] = useState('')
    const [page, setPage] = useState(1)
    const [upPdf, setUpPdf] = useState('')
    const [delPdf, setDelPdf] = useState('')
    const [refresh, setRefresh] = useState('')
    const [disable, setDisable] = useState(false)
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
    }, [])

        const approved = true
        const ApprovePdf = async () => {
            setDisable(true)
            const response = await fetch(`http://localhost:7000/api/file/${id}`,{
                method: 'PATCH',
                body: JSON.stringify({approved}),
                headers: {'Content-Type': 'application/json'}
            })

            const json = await response.json()
    
            if (response.ok) {
                alert('PDF has been approved...')
                setRefresh(json._id)
            }
    
            if (!response.ok) {
                console.log('error')
            }
        }

        const deletePdf = async () => {
            setDisable(true)
            const response = await fetch(`http://localhost:7000/api/file/${id}`, {
                method: 'DELETE'
            })
            
            const json = await response.json()
    
            if (response.ok) {
                alert('PDF has been rejected...')
                setRefresh(json._id)
            }
    
            if (!response.ok) {
                console.log('error')
            }
        }

    const { pdfDocument, pdfPage } = usePdf({
        file: oneFile.file || 'test.pdf',
        page,
        canvasRef,
    })

    return(
        <div id="pdfViewer">
            <div id='pdfView-Admin'>
            </div>
            <div id="pdfContainer">
                <div id="overviewPdf">
                {oneFile === '' && <Spinner animation="border" variant="light" className="loadingSpin2"/> }
                    <div id="overviewPdfViewAdmin">
                        {oneFile !== '' && <div id="pdfDetailsAdmin">
                            <h1>Research of {oneFile.strand} Students in STI Fairview</h1>
                            <h4>TITLE: {oneFile.title}</h4>
                            <h4>STRAND: {oneFile.strand}</h4>
                            <h4>YEAR PUBLISHED: ({oneFile.year})</h4>
                            <h4>AUTHORS: {oneFile.authors}</h4>
                            <span></span>
                        </div>}
                        <canvas ref={canvasRef} className="PDF"/>
                    </div>
                    <div id="overviewPdfButtonsAdmin">
                        <div id="approveButtonAdmin">
                            <span></span>
                            {(delPdf !== oneFile._id && upPdf !== oneFile._id && oneFile !== '' && refresh === '') &&
                            <div id="approveReject">
                                <Button variant="success" onClick={() => setUpPdf(id)}>APPROVE</Button>  
                                <Button variant="danger" onClick={() => setDelPdf(id)}>REJECT</Button>
                            </div>}
                            {refresh !== '' && <Link to='/dashboard' id='delete'>Go Back</Link>}
                            {(upPdf === oneFile._id && refresh === '') &&
                            <div>
                                <p>Warning: Are you sure you want to APPROVE this Pdf?</p>
                                <div>
                                    <Button variant="success" onClick={ApprovePdf} disabled={disable}>YES</Button>
                                    <Button variant="danger" onClick={() => setUpPdf('')} disabled={disable}>NO</Button>  
                                </div>
                            </div>}
                            {(delPdf === oneFile._id && refresh === '') && 
                            <div>
                                <p>Warning: Are you sure you want to REJECT this Pdf?</p>
                                <div>
                                    <Button variant="success" onClick={deletePdf} disabled={disable}>YES</Button>
                                    <Button variant="danger" onClick={() => setDelPdf('')} disabled={disable}>NO</Button>  
                                </div>
                            </div>}
                            <span></span>
                        </div>
                        <div id="pdfViewButton">
                            {(oneFile !== '' && !disable) && <Link to={`/pdfViewAdmin2/${oneFile._id}`}>View PDF</Link>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfViewAdmin