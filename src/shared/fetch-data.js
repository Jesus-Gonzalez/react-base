export default function fetchRequiredActions(...args){
  const serverContext = !!~args.indexOf('server')
  return (serverContext) ?  fetchServerData.apply(this, args) : fetchClientData.apply(this, args)
}

function fetchServerData(dispatch, components, params) {
  const actions = components.reduce( (prev, current) => {
    return Object.keys(current).reduce( (acc, key) => {
      return current[key].hasOwnProperty('requiredActions') ? current[key].requiredActions.concat(acc) : acc
    }, prev)

  }, [])

  const promises = actions.map(action => dispatch(action(params)));
  return Promise.all(promises)
}

function fetchClientData( actions, props, node){
  const store = window.$REACTBASE_STATE[node]
  const { params, dispatch } = props
  actions.map( action => dispatch(action(params)) )
}
