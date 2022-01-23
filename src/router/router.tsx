import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomeComponent } from '../components/home';
import { RegistrationComponent } from '../components/registration';
import { Demo } from '../components/demo';

export default function AppRouter() {
  return (
    <Router basename={'/TPS-frontend'}>
      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>
        <Route path="/registration">
          <RegistrationComponent />
        </Route>
        <Route path="/demo">
          <Demo />
        </Route>
      </Switch>
    </Router>
  );
}