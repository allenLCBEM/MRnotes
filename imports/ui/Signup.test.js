import {Meteor} from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';

import {Signup} from './Signup';

if(Meteor.isClient) {
  describe('Signup', function(){

    it('should show error msgs', function(){
      const error = 'this is an error msg';
      const wrapper = shallow(<Signup createUser={() => {}} />);

      wrapper.setState({error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with form data', function(){
      const email = 'test@test.com';
      const password = 'password';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup createUser={spy} />
        </MemoryRouter>
        );

      wrapper.find(Signup).node.refs['email'].value = email;
      wrapper.find(Signup).node.refs['password'].value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email, password});

    });

    // it('should set createUser callbk errs', function(){
    //   const spy = expect.createSpy();
    //   const wrapper = mount(
    //     <MemoryRouter initialEntries={['/']} initialIndex={0}>
    //       <Signup createUser={spy} />
    //     </MemoryRouter>
    //     );
    //
    //   wrapper.find('form').simulate('submit');
    //
    //   const signup = wrapper.find(Signup).node;
    //
    //   spy.calls[0].arguments[1]({});
    //   expect(signup.state['error']).toNotBe('');
    //
    //   spy.calls[0].arguments[1]();
    //   expect(signup.state['error']).toBe('');
    // });


  });
}
