import { QueryClient, QueryClientProvider } from 'react-query';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Reader from './components/Reader';
import { ReactQueryDevtools } from 'react-query/devtools';
import AddUser from './components/AddUser';
import UserDetails from './components/UserDetails';
import EditUser from './components/EditUser';

function App() {
  const client = new QueryClient();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate(0);
  };

  return (
    <QueryClientProvider client={client}>
      <header>
        <nav className='navbar'>
          <ul>
            <li>
              <Link to='/admin' className={'link-styles'}>
                Admin
              </Link>
            </li>
          </ul>
          {localStorage.getItem('token') ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <></>
          )}
        </nav>
      </header>
      <div className='app'>
        <Routes>
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<Reader />} />
          <Route path='admin/add' element={<AddUser />} />
          <Route path='/admin/:userId' element={<UserDetails />} />
          <Route path='/admin/:userId/edit' element={<EditUser />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
