import React, { Component } from 'react'
import axios from 'axios'
import getCookie from '../support/csrf'
import { changeUserData } from '../../actions/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
            showPassword: false,
        }
        this.sendLoginData = this.sendLoginData.bind(this)
    }
    sendLoginData() {
        if (this.state.login == '' && this.state.password == '') {
            this.setState({
                loginError: "поле не может быть пустым",
                passwordError: "поле не может быть пустым"
            })
            return
        } else if (this.state.login == '') {
            this.setState({ loginError: "поле не может быть пустым" })
            return
        } else if (this.state.password == '') {
            this.setState({ passwordError: "поле не может быть пустым" })
            return
        }
        const context = {
            username: this.state.login,
            password: this.state.password,
        }
        const headers = {
            header: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            }
        }
        axios.post('/api/auth/login', context, headers)
            .then(data => {
                this.props.changeUserData(data.data)
                this.props.history.push('/')
            })
            .catch(() => this.setState({ passwordError: "неверные данные", loginError: "неверные данные" }))
    }
    render() {
        return (
            <div className="row justify-content-center mt-4">
                <div className="col-5 border border-solid p-4 justify-content-center" style={{ "maxWidth": "500px" }}>
                    <TextField
                        className='w-100'
                        id="outlined-error-helper-text"
                        label="Имя пользователя *"
                        value={this.state.login}
                        onChange={e => this.setState({ login: e.target.value })}
                        variant="outlined"
                    />
                    <FormControl className="w-100 mt-4" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Пароль *</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <button onClick={this.sendLoginData} className="btn btn-md btn-primary mt-4">Войти</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { changeUserData })(withRouter(Login))