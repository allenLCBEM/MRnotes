import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

import {Notes} from '../api/notes';



export const NoteList = (props) => {

  function componentWillMount(){
    Session.set('selectedNoteId', location.pathname.split('/').filter(function(el){ return !!el; }).pop());
    //Session.set('selectedNoteId', this.match.params.id)
  }
componentWillMount();
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
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch().map((note) => {
        return {
          ...note,
          selected: note._id === selectedNoteId
        }
    })
  };
}, NoteList);
