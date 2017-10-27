import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import NoteListItem from './NoteListItem';

if(Meteor.isClient){
  describe('NoteListItem', function(){
    it('should render title and time', function(){
      const title = 'test title';
      const updatedAt = 1509113358947;
      const wrapper = mount(<NoteListItem note={{title, updatedAt}}/> );

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('10/27/17');
    });

    it('should set default title when no title set', function(){
      const title = '';
      const wrapper = mount(<NoteListItem note={{title}}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
