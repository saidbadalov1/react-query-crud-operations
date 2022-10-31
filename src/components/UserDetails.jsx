import axios from 'axios';
import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();
  const { data } = useQuery(['users', userId], () =>
    axios.get(`http://localhost:4000/users/${userId}`),
  );
  const navigate = useNavigate();
  const { mutate } = useMutation('users', () =>
    axios.delete(`http://localhost:4000/users/${userId}`),
  );

  const handleDelete = (e) => {
    e.preventDefault();
    mutate();
    navigate(-1);
  };

  return (
    <div className='user-details' key={data?.data.id}>
      <img src={data?.data.avatar} alt='Avatar' />
      <h3>
        Full Name: {data?.data.name} {data?.data.surname}
      </h3>
      <h4>
        Position: {data?.data.experience} {data?.data.vezife}
      </h4>
      <h4>
        Salary: {data?.data.maas} {data?.data.maas_valyuta}
      </h4>
      <h4>
        Online - at the office <span className='online'></span>
      </h4>
      <h4>Entry Time - 10:05 AM</h4>
      <h4>Exit Time - </h4>
      <Link to={`/admin/${userId}/edit`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete} className='delete'>
        Delete this person
      </button>
    </div>
  );
};

export default UserDetails;
