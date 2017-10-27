import React from 'react';
// import { Link } from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

import {Notes} from '../api/notes';

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader />
      notelist {props.notes.length}
      { props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
      {
        props.notes.map((note) => {
          return <NoteListItem key={note._id} note={note}/>
        })
      }

    </div>
  );
};

NoteList.PropTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
