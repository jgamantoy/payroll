/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import ProjectCondensed from '../reuseable/ProjectCondensed';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProjectsTab = () => {
  const [testArray, setTestArray] = useState([])
  const history = useHistory();

  useEffect(()=> {
    axios.get('http://localhost:3001/api/test').then((res)=>{
      setTestArray(res.data)
      console.log(res.data)
    })
  }, [])
  return (
    <div className="ProjectsTab">
      <div className="ProjectsTab__main">
      <div className="ProjectsTab__main__list">
          <h1>{testArray.length} Projects</h1>
          <div className="ProjectsTab__main__list__check">
            <input type="checkbox" name="showCompleted"></input>
            <label for="showCompleted">Show Completed</label>
          </div>
          {
            testArray.map(()=>{
              return <ProjectCondensed />
            })
          }
        </div>
        <div className="ProjectsTab__main__summary">
          <h1>Total Cost</h1>
          <h4> Php 12,000 /m</h4>
          <p>Sort:</p>
            <select>
              <option>Alphabetical</option>
              <option>Newest to Oldest</option>
              <option>Oldest to Newest</option>
            </select>

        </div>
        <div className="ProjectsTab__main__plus">
          <img
          src="/images/red_plus.png"
          alt="plus"
          onClick={()=> history.push('/create_project')}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectsTab;
