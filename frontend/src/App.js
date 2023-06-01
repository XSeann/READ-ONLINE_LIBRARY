import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

//MSAL
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'

//Pages
import Login from "./pages/login"
import Library from './pages/library'
import UploadPdf from './pages/uploadPdf'
import PdfView from './pages/pdfView'
import PdfView2 from './pages/pdfView2'
import Dashboard from './pages/dashboard'
import PdfViewAdmin from './pages/pdfViewAdmin'
import PdfViewAdmin2 from './pages/pdfViewAdmin2'
import PdfViewAdminDelete from './pages/pdfViewAdminDelete'
import PdfViewAdminDelete2 from './pages/pdfViewAdminDelete2'

//Components
import Nav from "./components/nav"

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const { accounts } = useMsal();

  const appStyle = {gridTemplateRows: `${accounts.length !== 0 ? '10% 90%' : '100%'}`}

  return (
    <div className="App" style={appStyle}>
      <AuthenticatedTemplate>
        <BrowserRouter>
        <Nav/>
          <Routes>
            <Route path="/" element={<Library/>}/>
            <Route path="/uploadPdf" element={<UploadPdf/>}/>
            <Route path="/pdfView/:id" element={<PdfView/>}/>
            <Route path="/pdfView2/:id" element={<PdfView2/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/pdfViewAdmin/:id" element={<PdfViewAdmin/>}/>
            <Route path="/pdfViewAdmin2/:id" element={<PdfViewAdmin2/>}/>
            <Route path="/pdfViewAdminDelete/:id" element={<PdfViewAdminDelete/>}/>
            <Route path="/pdfViewAdminDelete2/:id" element={<PdfViewAdminDelete2/>}/>
          </Routes>
        </BrowserRouter>
      </AuthenticatedTemplate>
          
      <UnauthenticatedTemplate>
        <Login/>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
