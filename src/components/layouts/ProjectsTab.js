import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ProjectCondensed from '../reuseable/ProjectCondensed';
import axios from 'axios';

const ProjectsTab = () => {
  const [projectList, setProjectList] = useState([])
  const history = useHistory();
  useEffect(()=>{
    axios.get('http://localhost:3001/api/projects').then((res)=>{
      console.log(res.data)
      setProjectList(res.data)
    })
  }, [])
  const totalCost = () => {
    let sum = 0
    if (projectList.length > 0){
      projectList.forEach((project) => {
        sum += project.total_cost;
      })
      return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return sum;
  }
  return (
    <div className="ProjectsTab">
      <div className="ProjectsTab__main">
      <div className="ProjectsTab__main__list">
          <h1>{projectList.length} Projects</h1>
          <div className="ProjectsTab__main__list__check">
            <input type="checkbox" name="showCompleted"></input>
            <label for="showCompleted">Show Completed</label>
          </div>
          {projectList.length > 0 ?
            projectList.map((proj)=>{
              return <ProjectCondensed proj={proj}/>
            }) : ''
          }
        </div>
        <div className="ProjectsTab__main__summary">
          <h1>Total Cost</h1>
          <h4> Php {totalCost()}</h4>
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
