import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchData = (pageNumber) => {
  const url = `https://randomuser.me/api?page=${pageNumber}`
  console.log(url)
  return axios.get(url)
  .then(({ data }) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.log(error);
  })
}

function App() {
  const [userJSON, setUserJSON] = useState('');
  const [userInfos, setUserInfos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    fetchData(pageNumber).then((data) => {
      setUserJSON(JSON.stringify(data));
      const newUserInfos = [...userInfos, ...data.results];
      setUserInfos(newUserInfos);
      setPageNumber(pageNumber + 1);
    })
  }, [])

  const fetchNextUser = () => {
    fetchData(pageNumber).then((data) => {
      setUserJSON(JSON.stringify(data));
      const newUserInfos = [...userInfos, ...data.results];
      setUserInfos(newUserInfos);
      setPageNumber(pageNumber + 1);
    })
  } 

  const buildUserName = (user) => {
    const { name : {first, last}} = user;
    return `${first} ${last}`;
  }

  return (
    <div className="App">
      <button onClick={() => {
        fetchNextUser();
      }}>Load more</button>
      {
        userInfos.map((user, idx) => (
          <div id={idx}>
            <img src={user.picture.thumbnail} alt="" />
            <p>{buildUserName(user)}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;