import React, { Component } from 'react'
import { render } from 'react-dom'
import { Main, Navbar, LoginModal, Account, Login, Registration, FullCatalog, Page404, Catalog, Blog } from './layout'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Test from './layout/support/Test'
import PrivateRoute from './layout/support/PrivateRoute'
import { getUser, getFullCatalog } from './actions/actions'


export default class App extends Component {
    componentDidMount() {
        store.dispatch(getUser())
        store.dispatch(getFullCatalog())
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Provider store={store}>
                        <Navbar />
                        <LoginModal />
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/registration' component={Registration} />
                            <Route exact path='/write' component={Test} />
                            <PrivateRoute exact path='/account' component={Account} />
                            <Route exact path='/:catalogName' component={FullCatalog} />
                            <Route exact path='/:catalogName/:blogName' component={Catalog} />
                            <Route exact path='/:catalogName/:blogName/:blogID' component={Blog} />
                            <Page404 />
                        </Switch>
                    </Provider>
                </BrowserRouter>
            </div>
        )
    }
}

render(<App />, document.getElementById('app'))