import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Alerts from './components/Alerts/Alerts';
import SignIn from './components/SignIn/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Access authentication status from context
  const { isAuthenticated } = useAuthContext();

  return (
    <div className='App'>
      <ToastContainer />
      <Navbar /> 
      <Routes>
        {/* Accessible by all*/}
        <Route path='/' element={<Dashboard />} />
        <Route path='/signin' element={<SignIn />} />

        {/* Protected route - only signed in user can view this */}
        <Route 
          path='/alerts' 
          element={isAuthenticated ? <Alerts /> : <Navigate to="/signin" />} 
        />
      </Routes>
    </div>
  );
}

export default App