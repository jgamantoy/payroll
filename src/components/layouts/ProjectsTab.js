import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCondensed from '../reuseable/ProjectCondensed';
import axios from 'axios';

const ProjectsTab = () => {
  const [projectList, setProjectList] = useState([])
  const [filteredProjectList, setFilteredProjectList] = useState([])
  const [search, setSearch] = useState('')
  const history = useHistory();
  console.log(search)
  useEffect(()=>{
    axios.get('http://localhost:3001/api/projects').then((res)=>{
      setProjectList(res.data)
      setFilteredProjectList(res.data)
    })
  }, [])
  useEffect(()=> {
    let newList = projectList.filter((proj) => proj.name.toLowerCase().includes(search) )
    setFilteredProjectList(newList)
  }, [search])
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
          {filteredProjectList.length > 0 ?
            filteredProjectList.map((proj)=>{
              return <ProjectCondensed proj={proj}/>
            }) : ''
          }
        </div>
        <div className="ProjectsTab__main__summary">
          <h1>Total Cost</h1>
          <h4> Php {totalCost()}</h4>
          <input 
            type="text"
            value={search}
            placeholder="Search for project"
            onChange={(e) => setSearch(e.target.value)}
          />
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
