import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateEmployee } from './components/create-employee';
import { EmployeeDetails } from './components/employee-details';
import EmployeeList from './components/employee-list';
import { GetEmployees } from './components/view-employee';

import { HomePage } from './pages/home-page'
import { ServicesPage } from './pages/services-page';

const queryClient = new QueryClient
function App() {
  return <>
  <QueryClientProvider client={queryClient}>
  <CreateEmployee/>
  <GetEmployees/>
  
  

  </QueryClientProvider>
  </>
    // <>
    //  <QueryClientProvider client={queryClient}>
    //  <BrowserRouter>
    //  <NavBar/>
    // <Routes>
    // <Route path='/' element={<HomePage/>}/>
    //   <Route path='/create' element={<CreateEmployee/>}/>
    //   <Route path='/update' element={<UpdateEmployee employee={{
    //           id: 0,
    //           firstName: '',
    //           lastName: '',
    //           title: '',
    //           email: ''
    //         }}/>}/>
    //    <Route path='/view' element={<GetEmployees/>}/>      
    //   <Route path='/services' element={<ServicesPage/>}/>
    // </Routes>
    // </BrowserRouter>

    //  </QueryClientProvider>
    
    // </>
    
  }

export default App;
