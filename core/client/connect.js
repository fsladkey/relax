const React = require('react')
const resourceConfig = require('../core')
const createFromAPI = require('../selectors/fromAPI')
const store = require('./store')

const fromAPI = createFromAPI(resourceConfig)

const dummyState = {}

module.exports = function connect(Component) {
  return class ConnectedComponent extends React.Component {

    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
      store.subscribe(this.handleChange)
    }

    getStateFromStore(store) {
      return Component.resources(store.from, this.props)
    }

    handleChange() {
      this.setState(dummyState)
    }

    shouldComponentUpdate() {
      return true
    }

    render() {
      const props = {
        ...this.props
        ...this.getStateFromStore(),
        from: fromAPI
      }

      return <Component { ...props }/>
    }

  }
}
``
