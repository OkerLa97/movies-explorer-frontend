import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import Main from '../Main/Main';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class App extends React.Component {

  static contextType = CurrentUserContext;

  // ИНИЦИАЛИЗАЦИЯ
  constructor(props) {
    super(props);
    this.state = {};
  }

  // МОНТИРОВАНИЕ
  componentDidMount() {
    console.log('App: componentDidMount');
  }

  // ОБНОВЛЕНИЕ
  componentDidUpdate() {
    console.log('App: componentDidUpdate');
  }

  // РЕНДЕРИНГ
  render() {
    console.log('App: render');
    console.log('App: this.context', this.context);
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="App">
          <div className="page">
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Main />} />

              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
