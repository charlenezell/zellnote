# Async Redux 
[about why](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

[reference](https://medium.com/react-native-training/redux-4-ways-95a130da0cdc)


1. hand async

    ```javascript
        //action.js
        export function getData() {
            return {
                type: FETCHING_DATA
            }
        }

        export function getDataSuccess(data) {
            return {
                type: FETCHING_DATA_SUCCESS,
                data,
            }
        }

        export function getDataFailure() {
            return {
                type: FETCHING_DATA_FAILURE
            }
        }

        //someUIComponent.js
        dispatch(getData());
        getPeople().then(data=>{
            if(success){
                dispatch(getDataSuccess(data))
            }else{
                dispatch(getDataFailure(data))
            }
        });

    ```

1. thunk

    > “Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.” — Redux Thunk documentation

    ```javascript
    //action.js
    export function fetchData() {
        return (dispatch) => {
            dispatch(getData())
            getPeople()
            .then((data) => {
                dispatch(getDataSuccess(data));
            })
            .catch((err) => {
                dispatch(getDataFailure(data));
            })
        }
    }
    ```

1. Saga 
    > “It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test. (if you’re not familiar with them here are some introductory links) By doing so, these asynchronous flows look like your standard synchronous JavaScript code. (kind of like async/await, but generators have a few more awesome features we need)” — Redux Saga documentation 官网说法是更容易测试还有更多的高级异步流控制功能
    :dog:[中文文档](http://leonshi.com/redux-saga-in-chinese/index.html) :cat:[官网文档](https://redux-saga.js.org/)

    ```javascript
    //action.js
    export function fetchData() {
        return {
            type: FETCHING_DATA
        }
    }
    //createStore.js
    export default function configureStore() {
        const store = createStore(app, applyMiddleware(sagaMiddleware))
        sagaMiddleware.run(dataSaga)
        return store
    }
    //sage.js
    import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
    import { put, takeEvery } from 'redux-saga/effects'
    import getPeople from './api'

    function* fetchData (action) {
        try {
            const data = yield getPeople();
            yield put({ type: FETCHING_DATA_SUCCESS, data }); //算是条用redux的原生dispatch而不在take里面响应？
        } catch (e) {
            yield put({ type: FETCHING_DATA_FAILURE });
        }
    }

    function* dataSaga () {
        yield takeEvery(FETCHING_DATA, fetchData) //绑定dispatch在这里可以takeLatest
    }

    export default dataSaga

    ```

1. Observable api待查学
    > “RxJS 5-based middleware for Redux. Compose and cancel async actions to create side effects and more.” — Redux Observable documentation
    ```javascript
    //createstore.js
    import { createStore, applyMiddleware } from 'redux'
    import app from './reducers'

    import { createEpicMiddleware } from 'redux-observable'
    import fetchUserEpic from './epic'

    const epicMiddleware = createEpicMiddleware(fetchUserEpic)

    export default function configureStore () {
    const store = createStore(app, applyMiddleware(epicMiddleware))
    return store
    }
    //epic.js
    import { FETCHING_DATA } from './constants'
    import { getDataSuccess, getDataFailure } from './actions'
    import getPeople from './api'

    import 'rxjs'
    import { Observable } from 'rxjs/Observable'

    const fetchUserEpic = action$ =>
    action$.ofType(FETCHING_DATA)
        .mergeMap(action =>
        Observable.fromPromise(getPeople())
            .map(response => getDataSuccess(response))
            .catch(error => Observable.of(getDataFailure(error)))
        )

    export default fetchUserEpic
    ```
1. promise
    > “Redux promise middleware enables robust handling of async code in Redux. The middleware enables optimistic updates and dispatches pending, fulfilled and rejected actions. It can be combined with redux-thunk to chain async actions.” — Redux Promise Middleware documentation


## revolution path

```javascript
dispatch({type:"SayHello",payload:"mike"});//1.pojo
dispatch(SayHello("mike"))//2. action creator => prevent repeat typo
```