import React from 'react';
import { useHistory } from 'react-router-dom';

const ProjectCondensed = () => {
  const history = useHistory()
  return (
  <div 
    className="ProjectCondensed"
    onClick={()=> history.push('/project/projecttitle')}
    >
    <div className="ProjectCondensed__main">
      <div className="ProjectCondensed__main__upper">
        <h2>Project Title</h2>
        <h4>Due date: Sept. 13, 2021</h4>
      </div>
      <div className="ProjectCondensed__main__lower">
        <p>Cost</p>
        <div className="ProjectCondensed__lower__members">
          {/* Add image of human shape here */}
          <p>10</p>
        </div>
      </div>
    </div>
  </div>
);
}

export default ProjectCondensed;
