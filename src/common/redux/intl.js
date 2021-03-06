import {createSelector} from 'reselect'
import {performRequest} from 'common/redux/api'

// The reducer for `react-intl-redux` is kind of bad.
// It doesn't allow for speculatively adding various locale keys.
// It's all "one update replaces everything"

export const ADD_LOCALE_MESSAGE = 'ADD_LOCALE_MESSAGE'

export const addMessage = (locale, messages) => ({type: ADD_LOCALE_MESSAGE, locale, messages})

export const getMessage = id => createSelector([state => state.intl.messages[id]], message => ({message}))

export const getKeys = (locale, messages) => async dispatch => {
  if (messages.length === 0) { return }
  const data = await dispatch(performRequest('/api/locale', 'POST', {messages, locale}))
  if (data) {
    dispatch(addMessage(locale, data.messages))
  }
}

const initialState = {locale: 'en', messages: {}}

export default (state = initialState, action) => {
  if (action.type !== ADD_LOCALE_MESSAGE) { return state }
  return {
    locale: action.locale,
    messages: {...state.messages, ...action.messages}
  }
}
