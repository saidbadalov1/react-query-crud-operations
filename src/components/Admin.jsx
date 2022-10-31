import axios from 'axios';
import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { isLoading, data } = useQuery('users', () =>
    axios.get(`http://localhost:4000/users/`),
  );

  const totalSalaryExpences = data?.data.length
    ? data.data.reduce((acc, current) => {
        if (current.maas_valyuta === '$') {
          return +current.maas * 1.7 + acc;
        }
        return acc + +current.maas;
      }, 0)
    : 0;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setToken(true);
      localStorage.setItem('token', token);
    }
  };

  if (!token) {
    return (
      <div className='login-admin'>
        <h3>Admin Login Page</h3>
        <form onSubmit={handleLoginSubmit}>
          <input
            type='text'
            id='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className='title'>
        <h2>My Employeers</h2>
        <Link to='add'>
          <button>Add Employeer</button>
        </Link>
      </div>

      <div className='users-grid'>
        {isLoading ? (
          <SkeletonTheme baseColor='#ffffff' highlightColor='#ebe9e9'>
            <Skeleton count={1} height={300} width={250} />
          </SkeletonTheme>
        ) : (
          data?.data.map((user) => {
            return (
              <div className='user-card' key={user.id}>
                <img src={user.avatar} alt='Avatar' />
                <h3>
                  {user.name} {user.surname}
                </h3>
                <h4>
                  {user.experience} {user.vezife}
                </h4>
                <h4>
                  {user.maas} {user.maas_valyuta}
                </h4>
                <Link to={`${user.id}`}>
                  <button>See Employeer Activity</button>
                </Link>
              </div>
            );
          })
        )}
        {}
      </div>
      <div className='title'>
        <h2>Dashboard</h2>
        {/* <Link to='add'>
          <button>Add Employeer</button>
        </Link> */}
      </div>
      <div className='dashboard'>
        <p className='expences'>
          Total Salary Expences - {totalSalaryExpences} AZN
        </p>
      </div>
    </div>
  );
};

export default Admin;
