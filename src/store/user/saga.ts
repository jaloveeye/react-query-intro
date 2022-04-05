import { GET_USERS } from "./actionTypes"
import { getUsersSuccess } from "./actions"
import { apiGet } from "../../api/api"
import { all, call, put, takeEvery, fork } from 'redux-saga/effects'

function* getUsers(urlParam: any): any {
    const response = yield call(apiGet, `users`, urlParam.payload)

    yield put(getUsersSuccess(response))
}

export function* watchGetUsers() {
    yield takeEvery(GET_USERS, getUsers)
}

function* UserSaga() {
    yield all([
        fork(watchGetUsers)
    ])
}

export default UserSaga
