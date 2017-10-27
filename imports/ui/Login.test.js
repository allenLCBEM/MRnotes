import {Meteor} from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';

import {Login} from './Login';

if(Meteor.isClient) {
  describe('Login', function(){

    it('should show error msgs', function(){
      const error = 'this is an error msg';
      const wrapper = shallow(<Login loginWithPassword={() => {}} />);

      wrapper.setState({error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with form data', function(){
      const email = 'test@test.com';
      const password = 'password';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
        );

      wrapper.find(Login).node.refs['email'].value = email;
      wrapper.find(Login).node.refs['password'].value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email});
      expect(spy.calls[0].arguments[1]).toBe(password);

    });

    it('should set loginWithPassword callbk errs', function(){
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
        );

      wrapper.find('form').simulate('submit');

      const login = wrapper.find(Login).node;

      spy.calls[0].arguments[2]({});
      expect(login.state['error']).toNotBe('');

      spy.calls[0].arguments[2]();
      expect(login.state['error']).toBe('');
    });


  });
}
