import React, { Fragment } from 'react';

const IdeaList = (props) => {
  console.log(props);
  return (
    <div>
      <Fragment>
        <h1>Idées</h1>
        {
          props.ideas.map((idea) => {
            return (
            <div key={idea.id} className='idea'>
              <div className='idea-title'>{idea.title}</div>
              <div>{idea.details}</div>
              <div className='tools'><button onClick={() => {props.onDelete(idea)}}>suppr</button></div>
            </div>
            )
          })
        }
      </Fragment>
		</div>
  ); 
}

export default IdeaList;