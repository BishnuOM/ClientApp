// import { configureStore } from '@reduxjs/toolkit'
// import createSagaMiddleware from 'redux-saga'
// import rootReducer from './reducers/rootReducer';
// import rootSaga from './saga/rootSaga';
// // Create the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// const middleware = [sagaMiddleware]
// // Mount it on the Store
// const store = configureStore({
//     rootReducer,
//   middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(middleware),
// })

// // Then run the saga
// sagaMiddleware.run(rootSaga)

// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = compose(
    applyMiddleware(...middleware),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);


export default store;