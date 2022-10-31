import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [position, setPosition] = useState('');
  const [photo, setPhoto] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState('$');
  const [experience, setExperience] = useState('Junior');

  const { mutate, isLoading } = useMutation('users', (newUser) =>
    axios.post(`http://localhost:4000/users/`, newUser),
  );

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name,
      surname,
      vezife: position,
      avatar: photo,
      maas: salary,
      maas_valyuta: salaryCurrency,
      experience,
    });
    navigate(-1);
  };

  return (
    <div>
      <h1 className='add-title'>Add Employeer</h1>
      <form onSubmit={handleSubmit}>
        <div className='add-employeer-form'>
          <div className='input-area'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              required
            />
          </div>
          <div className='input-area'>
            <label htmlFor='surname'>Surname</label>
            <input
              id='surname'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              type='text'
              required
            />
          </div>
          <div className='input-area'>
            <label htmlFor='position'>Position</label>
            <input
              id='position'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              type='text'
              required
            />
          </div>
          <div className='input-area'>
            <label htmlFor='photo'>Photo</label>
            <input
              id='photo'
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              type='text'
              required
            />
          </div>
          <div className='input-area'>
            <label htmlFor='salary'>Salary</label>
            <input
              id='salary'
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type='number'
              required
            />
          </div>
          <div className='input-area'>
            <label htmlFor='salaryCurrency'>Salary currency</label>
            <select
              value={salaryCurrency}
              onChange={(e) => setSalaryCurrency(e.target.value)}
              id='salaryCurrency'
              required
            >
              <option value='$'>$</option>
              <option value='AZN'>AZN</option>
            </select>
          </div>
          <div className='input-area'>
            <label htmlFor='experience'>Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              id='experience'
            >
              <option value='Junior'>Junior</option>
              <option value='Middle'>Middle</option>
              <option value='Senior'>Senior</option>
            </select>
          </div>
        </div>
        <button disabled={isLoading} type='submit'>
          Add Employeer
        </button>
      </form>
    </div>
  );
};

export default AddUser;
