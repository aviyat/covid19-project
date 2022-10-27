
import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './component/store/store'
import HomePage from './component/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddMember from './component/addMember';
import EditMember from './component/editMember';


function App() {



  return (
    <Provider store={store}>
      <div className="App">


        <Router>
          <div>

            <Switch>
              <Route path="/" exact component={HomePage}/>
              
              <Route path="/addMember" component={AddMember}/>
            
            <Route path="/edit/:id" component={EditMember}/>
              
            </Switch>
          </div>
        </Router>
      </div>

    </Provider>
  );
}


export default App;
