import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const ProjectCondensed = (props) => {
  const history = useHistory();
  const {id, name, end_date, total_cost, member_count} = props.proj;
  return (
    <div 
      className="ProjectCondensed"
      onClick={()=> history.push(`/project/${id}`)}
    >
      <div className="ProjectCondensed__main">
        <div className="ProjectCondensed__main__upper">
          <h2>{name}</h2>
          <h4>Due date: {moment(end_date).add(1, 'day').format("MMMM-DD-YYYY")}</h4>
        </div>
        <div className="ProjectCondensed__main__lower">
          <p>Php {total_cost ? total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</p>
          <div className="ProjectCondensed__main__lower__members">
            {/* Add image of human shape here */}
            <img
              src="/images/human.png"
              alt="icon"
            />
            <p>{member_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCondensed;
