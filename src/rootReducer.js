import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import tours from './reducers/tour';
import apps from './reducers/apps';
import contents from './reducers/content';
import analytics from './reducers/analytics';
import dashboard from './reducers/dashboard';
import billing from './reducers/billing';
import screens from './reducers/screens';

export default combineReducers({
  flashMessages,
  auth,
  tours,
  apps,
  contents,
  analytics,
  dashboard,
  billing,
  screens
});