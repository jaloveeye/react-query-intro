import { all } from 'redux-saga/effects'
import UserSaga from './user/saga'

export default function* rootSaga() {
    yield all([
        UserSaga(),
    ])
}