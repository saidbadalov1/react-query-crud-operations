import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const Reader = () => {
  const myInfo = 1;

  const { data } = useQuery('users', () =>
    axios.get(`http://localhost:4000/users/${myInfo}`),
  );

  const info = data?.data;

  return (
    <div>
      <div>{info.name}</div>
    </div>
  );
};

export default Reader;
