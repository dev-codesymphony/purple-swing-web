import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomeComponent } from '../components/home';
import { RegistrationComponent } from '../components/registration';
import { Demo } from '../components/demo';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>
        <Route path="/demo">
          <RegistrationComponent />
        </Route>
        <Route path="/registration">
          <Demo />
        </Route>
      </Switch>
    </Router>
  );
}