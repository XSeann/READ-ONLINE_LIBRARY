import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePdf } from '@mikecousins/react-pdf'

//React Bootstrap
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const PdfViewAdminDelete2 = () => {
    const [oneFile, setOneFile] = useState('')
    const [page, setPage] = useState(1)
    const [zoom, setZoom] = useState(80)
    const canvasRef = useRef(null)
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const getOneData = async () => {
            const response = await fetch(`https://read-online-library-web.onrender.com/api/file/${id}`)
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

    const pageAlert = () => {alert(`Page: ${page}/${pdfDocument && pdfDocument.numPages}`)}

    const pdfStyle = {height: `${zoom}%`, width: `${zoom}%`}

    const none = {}

    return(
        <div id="pdfViewer">
            <div className={`pdfView-${oneFile.strand}`}></div>
            <div id="pdfContainer">
                <div id="mainPdf">
                {oneFile === '' && <Spinner animation="border" variant="light" className="loadingSpin2"/> }
                    <div id="mainPdfView">
                        {oneFile !== '' && <div onClick={() => page > 1 && setPage(e => e - 1)}></div>}
                        <span></span>
                        {oneFile !== '' && <div><canvas ref={canvasRef} className="PDF" style={oneFile !== '' ? pdfStyle : none}/></div>}
                        <span></span>
                        {oneFile !== '' && <div onClick={() => page < pdfDocument.numPages && setPage(e => e + 1)}></div>}
                    </div>
                    <div id="mainPdfButton">
                        {oneFile !== '' && <Link to={`/pdfViewAdminDelete/${oneFile._id}`}>Go Back</Link>}
                        {pdfDocument && <Button onClick={pageAlert}>PAGE: {page}/{pdfDocument.numPages}</Button>}
                        {oneFile !== '' && 
                            <div id="zoom"> 
                                <span onClick={() => zoom > 50 && setZoom(e => e - 5)}></span>
                                <span>{zoom}%</span>
                                <span onClick={() => zoom < 300 && setZoom(e => e + 5)}></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfViewAdminDelete2