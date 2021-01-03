import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setModalStatus, changeUserData } from '../../actions/actions'
import getHeadersWithCSRF from '../support/getHeadersWithCSRF'
import axios from 'axios'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
            showPassword: false,
            passwordError: "",
            loginError: "",
        }
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
        const headers = getHeadersWithCSRF()
        axios.post('/api/auth/login', context, headers)
            .then(data => {
                this.props.changeUserData(data.data)
                this.props.setModalStatus(false)
            })
            .catch(() => this.setState({ passwordError: "неверные данные", loginError: "неверные данные" }))
    }
    render() {
        return (
            <Dialog open={this.props.openModal} onClose={() => this.props.setModalStatus(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Введите данные пользователя</DialogTitle>
                <DialogContent>
                    <TextField
                        error={this.state.loginError != ''}
                        fullWidth
                        id="outlined-error-helper-text"
                        label="Имя пользователя *"
                        value={this.state.login}
                        onChange={e => this.setState({ login: e.target.value })}
                        variant="outlined"
                        helperText={this.state.loginError}
                    />
                    <FormControl className="w-100 mt-4" variant="outlined">
                        <InputLabel error={this.state.passwordError != ''} htmlFor="outlined-adornment-password">Пароль *</InputLabel>
                        <OutlinedInput
                            error={this.state.passwordError != ''}
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
                        <FormHelperText style={{ 'color': "red" }} id="outlined-weight-helper-text">{this.state.passwordError}</FormHelperText>
                    </FormControl>
                    <button onClick={this.sendLoginData.bind(this)} className="btn btn-md btn-primary mb-2 mt-4">Войти</button>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    openModal: state.mainProperties.openModalLogin,
    token: state.auth.token,
})

export default connect(mapStateToProps, { setModalStatus, changeUserData })(LoginModal)