import React, { Component } from 'react'
import page404 from '../support/page404'
import { connect } from 'react-redux'
import axios from 'axios'
import getHeadersWithCSRF from '../support/getHeadersWithCSRF'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullCatalog: [],
            catalog: [],
            blogs: [],
            blog: {},
            HTMLString: "<h1>Hello world</h1>",
            fullCatalogSelectValue: '',
            catalogSelectValue: '',
            blogSelectValue: '',
            name: '',
            title: '',
        }
    }
    sendChanges() {
        const context = {
            HTMLText: this.state.HTMLString,
            name: this.state.name,
            title: this.state.title,
            catalog: this.state.catalogSelectValue,
        }

        const headers = getHeadersWithCSRF()
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.put(`/api/blog/${this.state.blogSelectValue}/`, context, headers)
            .then(() => {
                axios.get('/api/blog/')
                    .then(data => this.setState({ blogs: data.data }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    sendNewBlog() {
        const context = {
            HTMLText: this.state.HTMLString,
            title: this.state.title,
            name: this.state.name,
            catalog: this.state.catalogSelectValue,
        }

        const headers = getHeadersWithCSRF()
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.post(`/api/blog/`, context, headers)
            .then(() => {
                axios.get('/api/blog/')
                    .then(data => this.setState({ blogs: data.data, blogSelectValue: data.data[data.data.length - 1].id, HTMLString: data.data[data.data.length - 1].HTMLText, name: data.data[data.data.length - 1].name }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    deleteBlog() {
        const headers = getHeadersWithCSRF()
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.delete(`/api/blog/${this.state.blogSelectValue}/`, headers)
            .then(() => {
                axios.get('/api/blog/')
                    .then(data => this.setState({ blogs: data.data, blogSelectValue: data.data[0].id, HTMLString: data.data[0].HTMLText, name: data.data[0].name }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        axios.get('/api/fullcatalog/')
            .then(data => this.setState({ fullCatalog: data.data, fullCatalogSelectValue: data.data[0].id }))
            .catch(err => console.log(err))
        axios.get('/api/catalog/')
            .then(data => this.setState({ catalog: data.data, catalogSelectValue: data.data[0].id }))
            .catch(err => console.log(err))
        axios.get('/api/blog/')
            .then(data => this.setState({ blogs: data.data, blogSelectValue: data.data[0].id, HTMLString: data.data[0].HTMLText, name: data.data[0].name }))
            .catch(err => console.log(err))
    }
    onChangeBlogHandler(e) {
        const bl = this.state.blogs.filter(b => b.id == e.target.value)[0]
        this.setState({ catalogSelectValue: bl.catalog, blogSelectValue: bl.id, HTMLString: bl.HTMLText, name: bl.name })
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        if (!this.props.user || this.props.user.username != 'root')
            return page404()
        return (
            <div className='container mt-4'>
                <div className="row justify-content-center mb-4">
                    <div className='col-3 mt-4'>
                        <Select
                            className='w-100 mt-4'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='fullCatalogSelectValue'
                            value={this.state.fullCatalogSelectValue}
                            onChange={this.onChangeHandler.bind(this)}
                        >
                            {this.state.fullCatalog.map((c, i) => <MenuItem value={c.id} key={i}>{c.name}</MenuItem>)}
                        </Select>
                        <Select
                            className='w-100 mt-4'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='catalogSelectValue'
                            value={this.state.catalogSelectValue}
                            onChange={this.onChangeHandler.bind(this)}
                        >
                            {this.state.catalog.map((c, i) => <MenuItem value={c.id} key={i}>{c.name}</MenuItem>)}
                        </Select>
                        <Select
                            className='w-100 mt-4'
                            name='blogSelectValue'
                            value={this.state.blogSelectValue}
                            onChange={this.onChangeBlogHandler.bind(this)}
                        >
                            {this.state.blogs.map((c, i) => <MenuItem value={c.id} key={i}>{c.name}</MenuItem>)}
                        </Select>
                        <TextField className='w-100 mt-4' label="Название блога" value={this.state.name} onChange={this.onChangeHandler.bind(this)} name='name' />
                        <TextField className='w-100 mt-4' label="Титульник" value={this.state.title} onChange={this.onChangeHandler.bind(this)} name='title' />
                    </div>
                </div>
                <div className="btn-group m-4" role="group">
                    <button type="button" onClick={this.sendChanges.bind(this)} className="btn btn-primary">Сохранить изменения</button>
                    <button type="button" onClick={this.sendNewBlog.bind(this)} className="btn btn-secondary">Сохранить новый</button>
                    <button type="button" onClick={this.deleteBlog.bind(this)} className="btn btn-danger">Удалить</button>
                </div>

                <div className="form-group">
                    <textarea
                        value={this.state.HTMLString}
                        onChange={e => this.setState({ HTMLString: e.target.value })}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3" />
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.HTMLString }}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
})

export default connect(mapStateToProps, null)(Test)