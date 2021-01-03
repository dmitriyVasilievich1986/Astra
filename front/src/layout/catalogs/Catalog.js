import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page404 from '../support/page404'
import axios from 'axios'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            isLoading: true,
            catalogName: "",
            fullCatalogName: "",
        }
    }
    componentDidMount() {
        axios.get(`/api/blog/${this.props.match.params.blogName}/blog_by_id/`)
            .then(data => this.setState({ blogs: data.data.blogs, catalogName: data.data.catalog_name, fullCatalogName: data.data.full_catalog_name, isLoading: false }))
            .catch(() => this.setState({ isLoading: false }))
    }
    render() {
        if (this.state.blogs.length == 0)
            if (this.state.isLoading)
                return ""
            else
                return Page404()
        return (
            <div className='container mt-4'>
                <Breadcrumbs aria-label="breadcrumb" className='pb-3 mb-4 mt-2 pt-2 border-bottom border-solid'>
                    <Link to='/'>Главная</Link>
                    <Link to={`/${this.props.match.params.catalogName}`}>{this.state.fullCatalogName}</Link>
                    <a style={{ color: "gray" }}>{this.state.catalogName}</a>
                </Breadcrumbs>
                <ul className="list-group list-group-flush">
                    {this.state.blogs.map((b, i) => <li className="list-group-item" key={i}><Link to={`/${this.props.match.params.catalogName}/${this.props.match.params.blogName}/${b.id}`}>{b.title}</Link></li>)}
                </ul>
            </div>
        )
    }
}

export default Catalog