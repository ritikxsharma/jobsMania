import React from 'react'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { 
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error
} from './pages'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'dashboard',
          element: <DashboardLayout />
        },
      ]
    }
  ])

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='*' element={ <Error/> } />
    //     <Route path='/' element={ <HomeLayout/> }>
    //       <Route index={true} element={ <Landing/> } />
    //       <Route path='register' element={ <Register/> } />
    //       <Route path='login' element={ <Login/> } />
    //       <Route path='dashboard' element={ <DashboardLayout/> } />
    //       <Route path='error' element={ <Error/> } />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>

    <RouterProvider router={router} />

  )
}

export default App