
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Validator from 'common/util/validator'

class Form extends PureComponent {

  static defaultProps = {
    className: '',
    onSubmit: () => {}
  }

  static propTypes = {
    onSubmit: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  static childContextTypes = {
    validator: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.validator = new Validator()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getChildContext () {
    return {
      validator: this.validator
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const isValid = this.validator.validate()
    if (isValid) {
      this.props.onSubmit(event)
    }
  }

  render () {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit} noValidate>
        {this.props.children}
      </form>
    )
  }
}

export default Form
