import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


const NoteListItem = (props) => {
  return (
      <div>
        <h5>{props.note.title || 'Untitled note'}</h5>
        <p>{moment(props.note.updatedAt).format('MM/DD/YY')}</p>
      </div>
  );
};

NoteListItem.PropTypes = {
  note: React.PropTypes.object.isRequired
};

export default NoteListItem;
