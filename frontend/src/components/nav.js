//React Bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

//MSAL
import { useMsal } from "@azure/msal-react"

//React
import { useContext, useEffect, useRef, useState } from 'react';

//Router
import { useLocation,Link } from 'react-router-dom'

//Custom Hooks
import { useStrandContext } from '../hooks/useStrandContext';
import { FilterContext } from '../context/filterContext';

const Nav = () => {
    const filter = useContext(FilterContext)
    //const {sec, setSec} = useStrandContext()
    const { instance, accounts } = useMsal()
    const [users, setUsers] = useState([])
    const admin = useRef(false)
    const loc = useLocation()

    const handleLogout = () => {
        instance.logoutRedirect({
          postLogoutRedirectUri: "/"
        })
    }

    useEffect(() => {
      const getUsers = async () => {
          const response = await fetch('https://read-online-library-web.onrender.com/api/user/users')
          const json = await response.json()
  
          setUsers(json)
      }
      
      getUsers()
  
  }, [])

    const sec1 = () => {filter.strands.ICT('ICT')}

    const sec2 = () => {filter.strands.ABM('ABM')}

    const sec3 = () => {filter.strands.STEM('STEM')}

    const sec4 = () => {filter.strands.HUMMS('HUMMS')}

    const sec5 = () => {filter.strands.CA('CA')}

    const sec6 = () => {filter.strands.TO('TO')}

    const yearF1 = () => {filter.years.YEAR1('2015')}

    const yearF2 = () => {filter.years.YEAR2('2016')}
    
    const yearF3 = () => {filter.years.YEAR3('2017')}

    const yearF4 = () => {filter.years.YEAR4('2018')}

    const yearF5 = () => {filter.years.YEAR5('2019')}

    const yearF6 = () => {filter.years.YEAR6('2020')}

    const yearF7 = () => {filter.years.YEAR7('2021')}

    const yearF8 = () => {filter.years.YEAR8('2022')}

    const yearF9 = () => {filter.years.YEAR9('2023')}

    const searchText = (e) => {
      e.preventDefault()
      filter.searchEngine.SEARCH(e.target.value)
    }

    const searchNow = () => {
      filter.callSearch.CALLSEARCH(true)
    }

    for (let i = 0; i < users.length; i++) {
      if(users[i].email === accounts[0].username) {
        admin.current = true
      }
    }

    return(
        <div id="nav">
            <Link to='/'></Link>
            {loc.pathname === '/' ?
              <div id='libraryDropAndSearch'>
                <Dropdown
                id="filterStrand" 
                as={ButtonGroup}>
                  <Button>Filter Strand</Button>
                  <Dropdown.Toggle split id="dropdown-split" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={sec1} active={filter.strands.ict}>ICT</Dropdown.Item>
                    <Dropdown.Item onClick={sec2} active={filter.strands.abm}>ABM</Dropdown.Item>
                    <Dropdown.Item onClick={sec3} active={filter.strands.stem}>STEM</Dropdown.Item>
                    <Dropdown.Item onClick={sec4} active={filter.strands.humms}>HUMMS</Dropdown.Item>
                    <Dropdown.Item onClick={sec5} active={filter.strands.ca}>CA</Dropdown.Item>
                    <Dropdown.Item onClick={sec6} active={filter.strands.to}>TO</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                id="filterYear" 
                as={ButtonGroup}>
                  <Button>Filter Year</Button>
                  <Dropdown.Toggle split id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={yearF9} active={filter.years.year9}>2023</Dropdown.Item>
                    <Dropdown.Item onClick={yearF8} active={filter.years.year8}>2022</Dropdown.Item>
                    <Dropdown.Item onClick={yearF7} active={filter.years.year7}>2021</Dropdown.Item>
                    <Dropdown.Item onClick={yearF6} active={filter.years.year6}>2020</Dropdown.Item>
                    <Dropdown.Item onClick={yearF5} active={filter.years.year5}>2019</Dropdown.Item>
                    <Dropdown.Item onClick={yearF4} active={filter.years.year4}>2018</Dropdown.Item>
                    <Dropdown.Item onClick={yearF3} active={filter.years.year3}>2017</Dropdown.Item>
                    <Dropdown.Item onClick={yearF2} active={filter.years.year2}>2016</Dropdown.Item>
                    <Dropdown.Item onClick={yearF1} active={filter.years.year1}>2015</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div id='searchBar'>
                  <span></span>
                  <span onClick={searchNow}></span>
                  <input type='text' placeholder='Search Thesis or Capstone' onChange={searchText}/>
                </div>
              </div>: <div></div>
            }
            {accounts.length !== 0 && <h6 id="studentName">{accounts[0].name}</h6>}
            <Dropdown
            as={ButtonGroup}>
              <Dropdown.Toggle split id="dropdown-split"/>
              <Dropdown.Menu>
                <Dropdown.Item href='/'>LIBRARY<span id='libraryIconMenu'></span></Dropdown.Item>
                {!admin.current && <Dropdown.Item href='/uploadPdf'>UPLOAD PDF<span id='upPdfIconMenu'></span></Dropdown.Item>}
                {admin.current && <Dropdown.Item href='/dashboard'>DASHBOARD<span id='adminDashboard'></span></Dropdown.Item>}
                <Dropdown.Item onClick={handleLogout}>LOG OUT<span id='logOutIconMenu'></span></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Nav