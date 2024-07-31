import { Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/create-post" component={CreatePost} />
      <Route exact path="/post/:id" component={PostDetail} />
    </Switch>
  );
}

export default App;
