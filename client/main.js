import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import{createBrowserHistory} from 'history';

import {routes, onAuthChange} from '../imports/routes/routes';

import '../imports/startup/simple-schema-configuration.js';

const browserHistory = createBrowserHistory();

Tracker.autorun( () => {
  const isAuthd = !!Meteor.userId();
  onAuthChange(isAuthd);
});

Tracker.autorun( () => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId){
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup( () => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
})
