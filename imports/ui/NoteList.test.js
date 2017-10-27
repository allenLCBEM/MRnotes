import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteList} from './NoteList';


const notes =[
  {
    _id:'noteId1',
    title:'test title 1',
    body: 'test body 1',
    udpatedAt: 0,
    userId: 'userId1'
  },
  {
    _id:'noteId2',
    title:'test title 2',
    body: 'test body 2',
    udpatedAt: 0,
    userId: 'userId2'
  }
];

if(Meteor.isClient){
  describe('NoteList', function(){
    it('should render notelistitem for each note', function(){
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render notelistemptyitem if 0 notes', function(){
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
