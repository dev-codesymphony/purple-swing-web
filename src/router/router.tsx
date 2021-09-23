import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { HomeComponent } from "../components/home";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>
      </Switch>
    </Router>
  );
}