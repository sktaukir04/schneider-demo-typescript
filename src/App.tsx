import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import {Routes,Route,Link} from 'react-router-dom';
import Home from './components/Home/Home';
import Error from './components/Error Page/Error';
// import Listing from './components/Listing/Listing';
// import EmpDetails from './components/Listing/EmpDetails'
// import EditDEtails from './components/Listing/EditDEtails';
import SuccessPage from './components/Register/Success';
import Dashboard from './components/Register/Dashboard';
import ImportedData from './components/Listing/ImportedData';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/listing' element={<Dashboard />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path='/importedData' element={<ImportedData />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
