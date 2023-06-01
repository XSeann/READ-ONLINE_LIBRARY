import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Spinner from 'react-bootstrap/Spinner'

const Dashboard = () => {
    const [allPdf, setAllPdf] = useState([])
    const [page, setPage] = useState(0)
    const [page2, setPage2] = useState(0)
    let pdfArr = [[]]
    let pdfArr2 = [[]]

    useEffect(() => {
        const getPdf = async () => {
            const response = await fetch('https://read-online-library-web.onrender.com/api/file')
            const json = await response.json()
            setAllPdf(json)
        }
        
        getPdf()
    
    }, [])

    let y = -1
    let x = 0
    for (let i = 0; i < allPdf.length; i++) {
        if(!allPdf[i].approved) {
            y++
        }
        if(y > 4) {
            y = 0
            pdfArr.push([])
            x++
        }
        if(!allPdf[i].approved) {
            pdfArr[x].push(allPdf[i])
        }
    }

    let a = -1
    let b = 0
    for (let i = 0; i < allPdf.length; i++) {
        if(allPdf[i].approved) {
            a++
        }
        if(a > 4) {
            a = 0
            pdfArr2.push([])
            b++
        }
        if(allPdf[i].approved) {
            pdfArr2[b].push(allPdf[i])
        }
    }

    return(
        <div id="dashboard">
            <div id="dashboardSub"></div>
            <div id="dashboardSub2">
                <div id="dashBHeader">
                    <span></span>
                    <h2>PDF REQUEST</h2>
                    <span></span>
                    <h2>APPROVED PDF</h2>
                    <span></span>
                </div>
                <div id="dashBContents">
                    <span></span>
                    <div id="pdfReq"> 
                        <div>
                            <span onClick={() => page > 0 && setPage(e => e - 1)}>
                            </span><span>{page + 1}</span>
                            <span onClick={() => page < pdfArr.length - 1 && setPage(e => e + 1)}></span>
                        </div>
                        <div>
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length > 0 && pdfArr[page].map(data => 
                            <div>
                                <p>{data.title}</p>
                                <div><Link to={`/pdfViewAdmin/${data._id}`}>View</Link></div>
                            </div>)}
                        </div>
                    </div>
                    <span></span>
                    <div id="pdfApproved">
                        <div>
                            <span onClick={() => page2 > 0 && setPage2(e => e - 1)}></span>
                            <span>{page2 + 1}</span>
                            <span onClick={() => page2 < pdfArr2.length - 1 && setPage2(e => e + 1)}></span>
                        </div>
                        <div>
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length === 0 && <Spinner animation="border" variant="light" className="loadingSpin"/>}
                            {allPdf.length > 0 && pdfArr2[page2].map(data => 
                            <div>
                                <p>{data.title}</p>
                                <div><Link to={`/pdfViewAdminDelete/${data._id}`}>VIEW</Link></div>
                            </div>)}
                        </div>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard