import React, { Component } from 'react'

import axios from 'axios'
import getHeadersWithCSRF from '../support/getHeadersWithCSRF'
import { changeUserData } from '../../actions/actions'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

const emptyFieldError = 'поле не может быть пустым'

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            loginError: "",
            password: '',
            passwordError: "",
            password2: '',
            password2Error: "",
            showPassword: false,
            showPassword2: false,
        }
    }
    onChangeHandler(e) {
        this.setState({ [`${e.target.name}Error`]: "", [e.target.name]: e.target.value })
    }
    notEmptyHandler(target) {
        if (this.state[target] == '') {
            this.setState({ [`${target}Error`]: emptyFieldError })
            return 1
        }
        return 0
    }
    sendRegisterData() {
        if ((this.notEmptyHandler('login') + this.notEmptyHandler('password') + this.notEmptyHandler('password2')) > 0)
            return
        if (this.state.password != this.state.password2) {
            this.setState({ password2Error: 'пароли не совпадают' })
            return
        }
        const context = {
            username: this.state.login,
            password: this.state.password,
        }
        const headers = getHeadersWithCSRF()
        axios.post('/api/auth/register', context, headers)
            .then(data => {
                this.props.changeUserData(data.data)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                if (err.response.data.username[0] == 'A user with that username already exists.')
                    this.setState({ loginError: 'данное имя уже используется' })
            })
    }
    render() {
        return (
            <div className="row justify-content-center mt-4">
                <div className="col-5 border border-solid rounded p-4 justify-content-center" style={{ "maxWidth": "500px" }}>
                    <TextField
                        name='login'
                        error={this.state.loginError != ''}
                        fullWidth
                        id="outlined-error-helper-text"
                        label="Имя пользователя *"
                        value={this.state.login}
                        onChange={this.onChangeHandler.bind(this)}
                        variant="outlined"
                        helperText={this.state.loginError}
                    />
                    <FormControl className="w-100 mt-4" variant="outlined">
                        <InputLabel error={this.state.passwordError != ''} htmlFor="outlined-adornment-password">Пароль *</InputLabel>
                        <OutlinedInput
                            name='password'
                            error={this.state.passwordError != ''}
                            id="outlined-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.onChangeHandler.bind(this)}
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
                        <FormHelperText style={{ 'color': "red" }} id="outlined-weight-helper-text">{this.state.passwordError}</FormHelperText>
                    </FormControl>
                    <FormControl className="w-100 mt-4" variant="outlined">
                        <InputLabel error={this.state.password2Error != ''} htmlFor="outlined-adornment-password">Пароль *</InputLabel>
                        <OutlinedInput
                            name='password2'
                            error={this.state.password2Error != ''}
                            id="outlined-adornment-password"
                            type={this.state.showPassword2 ? 'text' : 'password'}
                            value={this.state.password2}
                            onChange={this.onChangeHandler.bind(this)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.setState({ showPassword2: !this.state.showPassword })}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                        <FormHelperText style={{ 'color': "red" }} id="outlined-weight-helper-text">{this.state.password2Error}</FormHelperText>
                    </FormControl>
                    <p className='ml-1 mt-3'>Если уже есть учетная запись, то можете войти<Link className='ml-2' to='/login'>здесь</Link></p>
                    <button onClick={this.sendRegisterData.bind(this)} className="btn btn-md btn-primary mt-2">Зарегестрироваться</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { changeUserData })(withRouter(Registration))