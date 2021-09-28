import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { HomeComponent } from "../components/home";
import { RegistrationComponent } from "../components/registration";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>
        <Route path="/registration">
          <RegistrationComponent />
        </Route>
      </Switch>
    </Router>
  );
}