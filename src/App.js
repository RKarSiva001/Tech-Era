import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import TechEra from './components/TechEra'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={TechEra} />
      <Route path="/te/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
