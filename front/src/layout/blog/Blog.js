import React, { Component } from 'react'
import axios from 'axios'
import page404 from '../support/page404'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom'

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            HTMLText: '',
            name: '',
            catalogName: '',
            fullCatalogName: '',
        }
    }
    componentDidMount() {
        axios.get(`/api/blog/${this.props.match.params.blogID}/`)
            .then(data => this.setState({ isLoading: false, HTMLText: data.data.HTMLText, name: data.data.title }))
            .catch(() => this.setState({ isLoading: false }))
        axios.get(`/api/blog/${this.props.match.params.blogID}/get_names/`)
            .then(data => this.setState({ fullCatalogName: data.data.full_catalog_name, catalogName: data.data.catalog_name }))
            .catch(() => this.setState({ isLoading: false }))
    }
    render() {
        if (this.state.HTMLText == '')
            if (this.state.isLoading)
                return ""
            else
                return page404()
        return (
            <div className='container'>
                <Breadcrumbs aria-label="breadcrumb" className='pb-3 mb-4 mt-2 pt-2 border-bottom border-solid'>
                    <Link to='/'>Главная</Link>
                    <Link to={`/${this.props.match.params.catalogName}`}>{this.state.fullCatalogName}</Link>
                    <Link to={`/${this.props.match.params.catalogName}/${this.props.match.params.blogName}`}>{this.state.catalogName}</Link>
                    <a style={{ color: "gray" }}>{this.state.name}</a>
                </Breadcrumbs>
                <div style={{ marginTop: "4rem" }}></div>
                <div dangerouslySetInnerHTML={{ __html: this.state.HTMLText }} />
            </div>
        )
    }
}

export default Blog