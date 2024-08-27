import React from 'react';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Body from './component/Body';


const App=()=>{
  return (
      <div>
        <Provider store={appStore}>
          <Body />
        </Provider>
      </div>
  );
}

export default App;
