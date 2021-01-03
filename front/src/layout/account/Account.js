import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import getHeadersWithCSRF from '../support/getHeadersWithCSRF'
import { updateUser } from '../../actions/actions'

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            email: "",
        }
    }
    componentDidMount() {
        this.setState({
            login: this.props.user.username,
            email: this.props.user.email,
        })
    }
    changeTextField(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    sendAccountDataToChange() {
        const context = {
            username: this.state.login,
            email: this.state.email,
        }

        const headers = getHeadersWithCSRF()
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.put('/api/auth/account', context, headers)
            .then(data => this.props.updateUser(data.data.user))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="row justify-content-center mt-4">
                <div className="col-7 justify-content-start">
                    <div>
                        <TextField
                            className='m-1 mt-4'
                            style={{ "width": "300px" }}
                            label="Имя пользователя"
                            name="login"
                            value={this.state.login}
                            onChange={this.changeTextField.bind(this)}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <TextField
                            className='m-1 mt-4'
                            style={{ "width": "300px" }}
                            label="Электронная почта"
                            name="email"
                            value={this.state.email}
                            onChange={this.changeTextField.bind(this)}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <button onClick={this.sendAccountDataToChange.bind(this)} className="btn btn-md btn-primary mt-4">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
})

export default connect(mapStateToProps, { updateUser })(Account)