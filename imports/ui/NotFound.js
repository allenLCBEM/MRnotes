import React from 'react';
import {Link} from 'react-router-dom';

// export default class NotFound extends React.Component {
//   render() {
//     return <p>NotFound Component</p>;
//   }
// }

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>Please try something else...</p>
        <Link to="/" className="button-link">GO HOME</Link>
      </div>
    </div>
  );
}
