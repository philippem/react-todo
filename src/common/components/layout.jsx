
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from './header'
import Footer from './footer'

import * as bootstrap from 'common/styles/bootstrap'

const mapStateToProps = state => ({
  requestInProgress: state.api.inProgress,
  requestError: state.api.error
})

/**
 * @returns {string} layout of the application
 */
const Layout = ({children, requestInProgress, requestError}) =>
  <div>
    <div className={bootstrap.container}>
      <Header />
      {children}
      {requestInProgress ? '...' : ''}
      {requestError}
    </div>
    <Footer />
  </div>

Layout.defaultProps = {
  requestError: ''
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  requestInProgress: PropTypes.bool.isRequired,
  requestError: PropTypes.string
}

export default connect(mapStateToProps)(Layout)
