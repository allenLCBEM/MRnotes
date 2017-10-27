import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {validateNewUser} from './users.js';

if(Meteor.isServer){
  describe('users', function() {
    it('should confirm valid email address', function(){
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      }

      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });

    it('should reject invalid email', function(){
      const testUser = {
        emails: [
          {
            address: 'test@gmail.com'
          }
        ]
      }
      expect( function(){
        validateNewUser(testUser);
      }).toNotThrow();
    });
  });
}
