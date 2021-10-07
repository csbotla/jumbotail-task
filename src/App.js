import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Search from "./components/Search";
import StockDetail from "./components/StockDetail";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/stock/:stock" exact={true} component={StockDetail} />
          <Route path="/" exact={true} component={Search} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
