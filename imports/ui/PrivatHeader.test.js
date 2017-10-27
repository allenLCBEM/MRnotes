import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient) {

  describe('PrivateHeader', function(){
      it('should set title by prop', function(){
        const title = 'im a title';
        const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}}/>)
        const titleVal = wrapper.find('h1').text();

        expect(titleVal).toBe(title);
      });

      it('should call handleLogout on click', function () {
        const spy = expect.createSpy();
        const wrapper = mount(<PrivateHeader title='duh' handleLogout={spy}/>)

        wrapper.find('button').simulate('click');

        expect(spy).toHaveBeenCalled();
      });
  });

}
