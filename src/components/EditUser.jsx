import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();
  const { data, isFetching } = useQuery(['users', userId], () =>
    axios.get(`http://localhost:4000/users/${userId}`),
  );

  const [name, setName] = useState(data?.data.name);
  const [surname, setSurname] = useState(data?.data.surname);
  const [position, setPosition] = useState(data?.data.vezife);
  const [photo, setPhoto] = useState(data?.data.avatar);
  const [salary, setSalary] = useState(data?.data.maas);
  const [salaryCurrency, setSalaryCurrency] = useState(data?.data.maas_valyuta);
  const [experience, setExperience] = useState(data?.data.experience);

  const { mutate, isLoading } = useMutation('users', (editUser) =>
    axios.put(`http://localhost:4000/users/${userId}`, editUser),
  );

  const fillState = () => {
    if (!isFetching) {
      setName(data?.data.name);
      setSurname(data?.data.surname);
      setPosition(data?.data.vezife);
      setPhoto(data?.data.avatar);
      setSalary(data?.data.maas);
      setSalaryCurrency(data?.data.maas_valyuta);
      setExperience(data?.data.experience);
    }
  };

  useEffect(() => {
    fillState();
    //eslint-disable-next-line
  }, [isFetching]);

  console.log(data?.data.name);
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
      <div>
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
                type='text'
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
            Update Employeer
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
