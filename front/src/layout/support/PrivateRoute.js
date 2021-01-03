import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function PrivateRoute({ component: Component, auth, ...rest }) {
    return <Route
        {...rest}
        render={props => {
            if (auth.isLoading)
                return <Backdrop style={{ "color": "#fff" }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            else if (auth.isAuthenticated)
                return <Component {...props} />
            return <div className='container mt-4'><h1 className='text-center'>Для доступа на данную страницу Вам необходимо зарегестрироваться.</h1></div>
        }}
    />
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(PrivateRoute)