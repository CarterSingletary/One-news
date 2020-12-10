import MainNavbar from "./components/MainNavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import { Container } from "react-bootstrap";
import CategoryPage from "./components/CategoryPage";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <Router>
      <MainNavbar />
      <Container>
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/:category" component={CategoryPage} exact />
          <Route path="/:category/:slug" component={ArticlePage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
