import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes.js';

if(Meteor.isServer){
  describe('notes', function(){
    const noteOne ={
      _id:'testNoteId1',
      title:'test title',
      body:'test body',
      userId:'testUserId1',
      updatedAt:0
    }

    const noteTwo ={
      _id:'testNoteId2',
      title:'test title2',
      body:'test body2',
      userId:'testUserId2',
      updatedAt:0
    }

    beforeEach(function(){
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function(){
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});

      expect(Notes.findOne({_id, userId})).toExist();
    });

    it('should not insert a note without user auth', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function(){
      Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId}, [noteOne._id]);

      expect(Notes.findOne({_id:noteOne._id})).toNotExist();
    });

    it('should not remove note without user auth', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid id', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId});
      }).toThrow();
    });

    it('should update note', function(){
      const title = 'Updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('should thorw err if extra updates', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          {name: 'bob'}
        ]);
      }).toThrow();
    });

    it('should not update if user wasnt creator', function(){
      const title = 'Updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'randomId1'
      }, [
        noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update note without user auth', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid id', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId});
      }).toThrow();
    });

    it('should return a users notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId:noteOne.userId});
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return nothing for user with no notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId:'testId'});
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });

  });
}
