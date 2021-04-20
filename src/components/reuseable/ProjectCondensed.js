import React from 'react';
import { useHistory } from 'react-router-dom';

const ProjectCondensed = (props) => {
  const history = useHistory();
  const {title, dueDate, cost, memCount} = props;
  return (
  <div 
    className="ProjectCondensed"
    onClick={()=> history.push('/project/projecttitle')}
    >
    <div className="ProjectCondensed__main">
      <div className="ProjectCondensed__main__upper">
        <h2>{title}</h2>
        <h4>Due date: {dueDate}</h4>
      </div>
      <div className="ProjectCondensed__main__lower">
        <p>Php {cost}</p>
        <div className="ProjectCondensed__lower__members">
          {/* Add image of human shape here */}
          <p>{memCount}</p>
        </div>
      </div>
    </div>
  </div>
);
}

export default ProjectCondensed;
