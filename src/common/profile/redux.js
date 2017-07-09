
import {createSelector} from 'reselect'
import ajax from 'common/ajax'
import {LOCATION_CHANGE} from 'react-router-redux'
import {infoRequest} from 'common/redux/api'
import {getMessage} from 'common/redux/intl'
import {updateUser} from 'common/redux/user'

const UPDATE_PROFILE = 'UPDATE_PROFILE'
const UPDATE_TEXT = 'UPDATE_TEXT'
const CLEAR_PROFILE_FORM = 'CLEAR_PROFILE_FORM'

export const getProfile = createSelector([
  state => state.profile.userName,
  state => state.profile.oldPassword,
  state => state.profile.newPassword,
  state => state.profile.confirmPassword,
  state => state.profile.shouldClear
], (
  userName,
  oldPassword,
  newPassword,
  confirmPassword,
  shouldClear
) => ({
  userName,
  oldPassword,
  newPassword,
  confirmPassword,
  shouldClear
}))

export const fetchProfile = () => (dispatch, getState) =>
  ajax(dispatch, getState)('/api/auth/profile', 'GET')
    .then(data => dispatch({type: UPDATE_PROFILE, data}))

export const updateProfile = data => ({type: UPDATE_PROFILE, data})

export const updateText = (fieldName, value) => ({type: UPDATE_TEXT, fieldName, value})

export const changeUser = userName => (dispatch, getState) =>
  ajax(dispatch, getState)('/api/auth/profile', 'POST', {userName})
    .then(data => {
      dispatch({type: CLEAR_PROFILE_FORM})
      dispatch(infoRequest(getMessage('profile.profile-change-successful')(getState())))
      dispatch(updateUser(data))
      dispatch(updateProfile(data))
    })
    .catch(() => { /* Hmmm */ })

export const changePassword = (oldPassword, newPassword) => (dispatch, getState) =>
  ajax(dispatch, getState)('/api/auth/password', 'POST', {oldPassword, newPassword})
    .then(() => dispatch(infoRequest(getMessage('profile.password-change-successful')(getState()))))
    .catch(() => { /* Hmmmm */ })
    .then(() => dispatch({type: CLEAR_PROFILE_FORM}))


const initialState = {
  userName: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      if (action.payload.pathname === '/auth/profile') { return state }
      /* eslint-disable no-fallthrough */
    case CLEAR_PROFILE_FORM:
      return {...initialState, userName: state.userName, shouldClear: true}
    case UPDATE_PROFILE:
      return {...state, shouldClear: false, userName: action.data.userName}
    case UPDATE_TEXT:
      return {...state, shouldClear: false, [action.fieldName]: action.value}
    default:
      return state
  }
}