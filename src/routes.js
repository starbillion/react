import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './App';
import BuildWrapper from './build';

// require auth runs to see if logged in
import requireAuth from './utils/requireAuth';

import Dashboard from './views/dashboard';
import Templates from './views/templates';
import AppsPage from './views/apps/created';
import AppStepOne from './views/apps/new';
import AppStepTwo from './views/apps/new/startInfo';
import AppStepThree from './views/apps/new/coverPhoto';
import EditTour from './views/apps/edit';
import PreviewTour from './views/apps/preview';
import Build from './views/apps/build';
import Content from './views/interact/content';
import Message from './views/interact/messages';
import Company from './views/company';
import QuestionAndAnswer from './views/interact/qanda';
import Analytics from './views/analytics';
import Downloads from './views/analytics/downloads';
import Heatmap from './views/analytics/heatmap';
import HeatmapDetails from './views/analytics/heatmap/details/';
import Engagement from './views/analytics/engagement';
import Profit from './views/profit';
import Billing from './views/billing';
import CompanyBilling from './views/company/billing';
import BuildStop from './views/apps/stops';
import BuildStopDetails from './views/apps/stops/details';
import Profile from './views/profile';

// build
import General from './views/build/general';
import Beacon from './views/build/beacons';
import Maps from './views/build/maps';
import Screens from './views/build/screens';
import More from './views/build/more';
import Restaurant from './views/build/restaurant';
import Tours from './views/build/tours';
import ContentModule from './views/build/content';

// charts
import Charts from './views/charts';

// pages
import SignIn from './views/pages/signin';
import Register from './views/pages/register';
import ForgetPass from './views/pages/forget';
import Page404 from './views/pages/404';
import PageInvoice from './views/pages/invoice';

export default (
    <Route>
        <Route component={App} path='/'>
            <IndexRoute component={requireAuth(Dashboard)}/>
            <Route path='templates' component={requireAuth(Templates)}/>
            <Route path='apps'  component={requireAuth(AppsPage)} />
            <Route path='apps/new'  component={requireAuth(AppStepOne)} />
            <Route path='apps/new/2'  component={requireAuth(AppStepTwo)} />
            <Route path='apps/new/3'  component={requireAuth(AppStepThree)} />
            <Route path='apps/:id/edit' component={requireAuth(EditTour)} />
            <Route path='qanda' component={requireAuth(QuestionAndAnswer)}/>
            <Route path='discuss' component={requireAuth(Content)}/>
            <Route path='messages' component={requireAuth(Message)}/>
            <Route path='analytics' component={requireAuth(Analytics)}/>
            <Route path='analytics/downloads' component={requireAuth(Downloads)}/>
            <Route path='analytics/engagement' component={requireAuth(Engagement)}/>
            <Route path='analytics/heatmap' component={requireAuth(Heatmap)}/>
            <Route path='analytics/heatmap/:id' component={requireAuth(HeatmapDetails)}/>
            <Route path='profit' component={requireAuth(Profit)}/>
            <Route path='billing' component={requireAuth(Billing)}/>
            <Route path='profile' component={requireAuth(Profile)}/>
        </Route>
        <Route component={BuildWrapper} path='/'>
            <Route component={requireAuth(General)} path='apps/:id/build/info'/>
            <Route component={requireAuth(Screens)} path='apps/:id/build/screens'/>
            <Route component={requireAuth(Maps)} path='apps/:id/build/maps'/>
            <Route component={requireAuth(Beacon)} path='apps/:id/build/beacons'/>
            <Route component={requireAuth(Tours)} path='apps/:id/build/tours'/>
            <Route component={requireAuth(Restaurant)} path='apps/:id/build/restaurant'/>
            <Route component={requireAuth(More)} path='apps/:id/build/more'/>
            <Route component={requireAuth(ContentModule)} path='apps/:id/build/interact'/>
        </Route>
        <Route component={requireAuth(Build)} path='apps/:id/build'/>
        <Route component={requireAuth(BuildStop)} path='apps/:id/tours/:tour_id/stops'/>
        <Route component={requireAuth(BuildStopDetails)} path='apps/:id/tours/:tour_id/stops/:stop_id'/>
        <Route path='apps/:id/preview' component={requireAuth(PreviewTour)} />
        <Route component={SignIn} path='pages/signin'/>
        <Route component={Register} path='pages/register'/>
        <Route component={ForgetPass} path='pages/forget'/>
        <Route component={Page404} path='pages/404'/>
        <Route component={PageInvoice} path='billing/invoice/:id'/>
        <Route component={Company} path='company'/>
        <Route component={CompanyBilling} path='company/billing'/>
        {/* default */}
        <Route component={Page404} path='404'/>
        <Redirect from="*" to="404"/>
    </Route>
);