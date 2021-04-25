import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCondensed from '../reuseable/ProjectCondensed';
import TransCalendar from '../reuseable/TransCalendar';
import axios from 'axios';
import moment from 'moment'

const ProjectsTab = () => {
  const [projectList, setProjectList] = useState([]) //Static list of projects
  const [filteredProjectList, setFilteredProjectList] = useState([]) //List of projects, including filters, to be mapped
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)

  const history = useHistory();
  const currentDate = moment().format("YYYY-MM-DD");

  useEffect(()=>{
    axios.get('http://localhost:3001/api/projects').then((res)=>{
      setProjectList(res.data)
      setFilteredProjectList(res.data)
    })
  }, [])

  useEffect(()=> {
    let newList = projectList.filter((proj) => proj.name.toLowerCase().includes(search.toLowerCase()) )
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
            
            <label for="showCompleted">
            <input 
              id="checkbox"
              type="checkbox" 
              name="showCompleted" 
              onChange={()=> setChecked(!checked)}
            />
            Show Completed
            </label>
          </div>
          {filteredProjectList.length > 0 ?
            filteredProjectList.map((proj)=>{
              if(moment(currentDate).isAfter(proj.end_date)){
                if (checked){
                  return <ProjectCondensed proj={proj}/>
                } else {
                  return ''
                }
              } else {
                return <ProjectCondensed proj={proj}/>
              }

            }) : 
            <h4>Nothing to show...</h4>
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
          <div className="ProjectsTab__main__summary__transactions">
            <h4>Upcoming Payments</h4>
            <TransCalendar />
          </div>
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
