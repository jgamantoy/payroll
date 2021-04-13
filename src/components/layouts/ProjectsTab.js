/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ProjectCondensed from '../reuseable/ProjectCondensed';

const ProjectsTab = () => {
  const testArray = [1,2,3];
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
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectsTab;
