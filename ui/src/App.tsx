import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import LoginPage from "./pages/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { UserContextProvider } from "./contexts/user.context";
import SignUpPage from './pages/SignUp'
const App = () => {
  return (
    <div className="page-container">
      <UserContextProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>
            <AuthenticatedRoute path="/">
              <Home />
            </AuthenticatedRoute>
          </Switch>
        </Router>
      </UserContextProvider>

    </div>
  );
};

export default App;
