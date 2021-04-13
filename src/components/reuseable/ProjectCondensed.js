import React from 'react';

const ProjectCondensed = () => {
  return (
  <div className="ProjectCondensed">
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
    <div className="ProjectCondensed__footer" />
  </div>
);
}

export default ProjectCondensed;
