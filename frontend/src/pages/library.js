import { Link } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { FilterContext } from "../context/filterContext"

import escapeStringRegexp from 'escape-string-regexp'

import Spinner from 'react-bootstrap/Spinner'

const Library = () => {
    const filter = useContext(FilterContext)
    const [files, setFiles] = useState([])
    const searchData = useRef([])
    const page = useRef(0)
    let pdfArr = [[]]

    useEffect(() => {
        const getAllFiles = async () => {
            const response = await fetch('http://localhost:7000/api/file')

            const json = await response.json()
            
            setFiles(json)

        }

        getAllFiles()
    }, [])

    let y = -1
    let x = 0
    for (let i = 0; i < files.length; i++) {
        let sec = files[i].strand
        let dte = files[i].year

        if (files[i].approved && (((sec === filter.strands.ict || sec === filter.strands.humms || sec === filter.strands.abm || sec === filter.strands.stem 
            || sec === filter.strands.ca || sec === filter.strands.to) 

            && 

            (filter.years.year1 === '' && filter.years.year2 === '' && filter.years.year3 === '' && filter.years.year4 === '' && 
            filter.years.year5 === '' && filter.years.year6 === '' && filter.years.year7 === '' && filter.years.year8 === '' && 
            filter.years.year9 === '')) 

            || 

            ((dte === filter.years.year1 || dte === filter.years.year2 || dte === filter.years.year3 || dte === filter.years.year4 
            || dte === filter.years.year5 || dte === filter.years.year6 || dte === filter.years.year7 || dte === filter.years.year8 
            || dte === filter.years.year9) 

            && 

            (filter.strands.ict === '' && filter.strands.humms === '' && filter.strands.abm === '' && filter.strands.stem === '' 
            && filter.strands.ca === '' && filter.strands.to === '')) 
            
            || 

            ((sec === filter.strands.ict || sec === filter.strands.humms || sec === filter.strands.abm || sec === filter.strands.stem 
            || sec === filter.strands.ca || sec === filter.strands.to) 
            
            && 

            (dte === filter.years.year1 || dte === filter.years.year2 || dte === filter.years.year3 || dte === filter.years.year4 
            || dte === filter.years.year5 || dte === filter.years.year6 || dte === filter.years.year7 || dte === filter.years.year8 
            || dte === filter.years.year9))

            || 
            
            (filter.strands.ict === '' && filter.strands.humms === '' && filter.strands.abm === '' && filter.strands.stem === '' 
            && filter.strands.ca === '' && filter.strands.to === '' && filter.years.year1 === '' && filter.years.year2 === '' && 
            filter.years.year3 === '' && filter.years.year4 === '' && filter.years.year5 === '' && filter.years.year6 === '' 
            && filter.years.year7 === '' && filter.years.year8 === '' && filter.years.year9 === ''))) {
            
            y++
        }

        if(y >= 21) {
            pdfArr.push([])
            y = 0
            x++
        }

        if(files != null && files[i].approved && (((sec === filter.strands.ict || sec === filter.strands.humms || sec === filter.strands.abm || sec === filter.strands.stem 
            || sec === filter.strands.ca || sec === filter.strands.to) 

            && 

            (filter.years.year1 === '' && filter.years.year2 === '' && filter.years.year3 === '' && filter.years.year4 === '' && 
            filter.years.year5 === '' && filter.years.year6 === '' && filter.years.year7 === '' && filter.years.year8 === '' && 
            filter.years.year9 === '')) 

            || 

            ((dte === filter.years.year1 || dte === filter.years.year2 || dte === filter.years.year3 || dte === filter.years.year4 
            || dte === filter.years.year5 || dte === filter.years.year6 || dte === filter.years.year7 || dte === filter.years.year8 
            || dte === filter.years.year9) 

            && 

            (filter.strands.ict === '' && filter.strands.humms === '' && filter.strands.abm === '' && filter.strands.stem === '' 
            && filter.strands.ca === '' && filter.strands.to === '')) 
            
            || 

            ((sec === filter.strands.ict || sec === filter.strands.humms || sec === filter.strands.abm || sec === filter.strands.stem 
            || sec === filter.strands.ca || sec === filter.strands.to) 
            
            && 

            (dte === filter.years.year1 || dte === filter.years.year2 || dte === filter.years.year3 || dte === filter.years.year4 
            || dte === filter.years.year5 || dte === filter.years.year6 || dte === filter.years.year7 || dte === filter.years.year8 
            || dte === filter.years.year9))

            || 
            
            (filter.strands.ict === '' && filter.strands.humms === '' && filter.strands.abm === '' && filter.strands.stem === '' 
            && filter.strands.ca === '' && filter.strands.to === '' && filter.years.year1 === '' && filter.years.year2 === '' && 
            filter.years.year3 === '' && filter.years.year4 === '' && filter.years.year5 === '' && filter.years.year6 === '' 
            && filter.years.year7 === '' && filter.years.year8 === '' && filter.years.year9 === ''))) {

            pdfArr[x].push(files[i])
        }
    }    

    let inp = filter.searchEngine.search
    let layer = [[], [[]]]

    const searchFunc = () => {
        if(filter.searchEngine.search !== '') {
            searchData.current = []
            setTimeout(() => {one()}, 100);
        }

        function one() {searchData.current = layer[1]}
        if(filter.searchEngine.search === '') {
            searchData.current = []
        }
        page.current = 0
    }

    if(files.length !== 0 && inp !== '') {  
        
        for (let i = 0; i < files.length; i++) {
            let reg = new RegExp(escapeStringRegexp(inp), 'ig')
            let spl = files[i].title
            let sec = files[i].strand
            let dte = files[i].year

            if(spl.match(reg) && files[i].approved) { //approved
                let id = files[i]._id
                let authors = files[i].authors
                let date = files[i].year
                let section = files[i].strand
                let spl2 = files[i].title.indexOf(reg.exec(files[i].title))
                let views = files[i].views
                let str = ''
                let str2 = ''
                let str3 = ''
                let lp = (((sec === filter.strands.ict || sec === filter.strands.humms || sec === filter.strands.abm || sec === filter.strands.stem 
                    || sec === filter.strands.ca || sec === filter.strands.to) 
        
                    && 
        
                    (filter.years.year1 === '' && filter.years.year2 === '' && filter.years.year3 === '' && filter.years.year4 === '' && 
                    filter.years.year5 === '' && filter.years.year6 === '' && filter.years.year7 === '' && filter.years.year8 === '' && 
                    filter.years.year9 === '')) 
        
                    || 
        
                    ((dte === filter.years.year1 || dte === filter.years.year2 || dte === filter.years.year3 || dte === filter.years.year4 
                    || dte === filter.years.year5 || dte === filter.years.year6 || dte === filter.years.year7 || dte === filter.years.year8 
                    || dte === filter.years.year9) 
        
                    && 
        
                    (filter.strands.ict === '' && filter.strands.humms === '' && filter.strands.abm === '' && filter.strands.stem === '' 
                    && filter.strands.ca === '' && filter.strands.to === '')) 
                    
                    || 
        
                    ((sec === filter.strands.ict || sec === filter.strands.humms || sec === filter.strands.abm || sec === filter.strands.stem 
                    || sec === filter.strands.ca || sec === filter.strands.to) 
                    
                    && 
        
                    (dte === filter.years.year1 || dte === filter.years.year2 || dte === filter.years.year3 || dte === filter.years.year4 
                    || dte === filter.years.year5 || dte === filter.years.year6 || dte === filter.years.year7 || dte === filter.years.year8 
                    || dte === filter.years.year9))
        
                    || 
                    
                    (filter.strands.ict === '' && filter.strands.humms === '' && filter.strands.abm === '' && filter.strands.stem === '' 
                    && filter.strands.ca === '' && filter.strands.to === '' && filter.years.year1 === '' && filter.years.year2 === '' && 
                    filter.years.year3 === '' && filter.years.year4 === '' && filter.years.year5 === '' && filter.years.year6 === '' 
                    && filter.years.year7 === '' && filter.years.year8 === '' && filter.years.year9 === ''))

                for (let i = 0; i < spl.length; i++) {
                    
                    if(i < spl2 && spl2 !== 0 && lp) {
                        str += spl[i]   
                        str2 = <b className="boldReg">{inp.toUpperCase()}</b>
                    }
                    if(spl2 === 0 && lp) { 
                        str = ''  
                        str2 = <b className="boldReg">{inp.toUpperCase()}</b>
                    }
                    if(i >= spl2 + inp.length && lp) {   
                        str3 += spl[i]
                    }
                }

                if(lp) {
                    layer[0].push({views: views})
                    layer[0].push({id: id})
                    layer[0].push({authors: authors})
                    layer[0].push({date: date})
                    layer[0].push({section: section})
                    layer[0].push({title: str})
                    layer[0].push({bold: str2})
                    layer[0].push({title2: str3})
                    
                }
            }
        }
        let a = -1
        let b = -2
        let c = -3
        let d = -4
        let e = -5
        let f = -6
        let g = -7
        let x = -8
        let h = -1
        let k = 0
        for (let i = 0; i < layer[0].length / 8 ; i++) {
            a+=8
            b+=8
            c+=8
            d+=8
            e+=8
            f+=8
            g+=8
            x+=8
            h++

            if(h >= 21) {
                layer[1].push([])
                h = 0
                k++
            }
            
            layer[1][k].push([layer[0][c].title, layer[0][b].bold, layer[0][a].title2, layer[0][d].section, layer[0][e].date, layer[0][f].authors, layer[0][g].id, layer[0][x].views])
        }
    }
    
    if(filter.callSearch.call) {searchFunc()}

    const noRes = searchData.current.length === 1 && searchData.current[0].length === 0

    return(
        <div id="library">
            {pdfArr[0].length === 0 && 
            <div id="pdfCollection">
                {pdfArr[0].length === 0 && <Spinner animation="border" variant="light" className="loadingSpin3"/>}
                {pdfArr[0].length === 0 && <Spinner animation="border" variant="light" className="loadingSpin3"/>}
                {pdfArr[0].length === 0 && <Spinner animation="border" variant="light" className="loadingSpin3"/>}
                {pdfArr[0].length === 0 && <Spinner animation="border" variant="light" className="loadingSpin3"/>}
                {pdfArr[0].length === 0 && <Spinner animation="border" variant="light" className="loadingSpin3"/>}
                {pdfArr[0].length === 0 && <Spinner animation="border" variant="light" className="loadingSpin3"/>}
            </div>}
            {(searchData.current.length !== 0 || pdfArr[0].length > 0) && <div id="pdfCollection">
                {(pdfArr[0].length !== 0 && searchData.current.length === 0) ? 
                
                pdfArr[0].map(fileData => 
                <div id="bookCard" className={`bookCard-${fileData.strand}`} key={fileData._id}>
                    <div className="preview">
                        <p className="titlePrev">{fileData.title}</p>
                        <p className="subTitlePrev">A Research Presented to <br/> The Senior High School Department <br/> STI COLLEGE FAIRVIEW</p>
                        <p className="authorsPrev">BY: <br/>{fileData.authors.split(',').map(data => <span key={data}>{data.toUpperCase()}<br/></span>)}</p>
                    </div>
                    <div className="details">
                        <div>
                            <h5 className="title">Research of {fileData.strand} Students in STI College Fairview</h5>
                            <h6 className="strandDetail">{fileData.strand}</h6>
                            <p className="subDetails"><span>{fileData.views.toString()}<br/>Views</span><span>{fileData.year}<br/>Year</span></p>
                            <Link to={`/pdfView/${fileData._id}`} className="linkDetail" onClick={() => filter.ID(fileData.views, fileData._id)}>Open</Link>
                        </div>
                        <div></div>
                    </div>
                </div>) : 

                searchData.current[0].map(fileData => 
                <div id="bookCard" className={`bookCard-${fileData[3]}`} key={fileData[6]}>
                    <div className="preview">
                        <p className="titlePrev"><p>{fileData[0]}{fileData[1]}{fileData[2]}</p></p>
                        <p className="subTitlePrev">A Research Presented to <br/> The Senior High School Department <br/> STI COLLEGE FAIRVIEW</p>
                        <p className="authorsPrev">BY: <br/>{fileData[5].split(',').map(data => <span key={data}>{data.toUpperCase()}<br/></span>)}</p>
                    </div>
                    <div className="details">
                        <div>
                            <h5 className="title">Research of {fileData[3]} Students in STI College Fairview</h5>
                            <h6 className="strandDetail">{fileData[3]}</h6>
                            <p className="subDetails"><span>{fileData[7]}<br/>Views</span><span>{fileData[4]}<br/>Year</span></p>
                            <Link to={`/pdfView/${fileData[6]}`} className="linkDetail" onClick={() => filter.ID(fileData[7], fileData[6])}>Open</Link>
                        </div>
                        <div></div>
                    </div>
                </div>)}

                {noRes && <div id="noRes"></div>}{noRes && <div id="noRes">"No Results"</div>}{noRes && <div id="noRes"></div>}

            </div>}
        </div>
    )
}

export default Library