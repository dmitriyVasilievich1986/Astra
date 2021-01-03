import React, { Component } from 'react'
import axios from 'axios'
import page404 from '../support/page404'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import getHeadersWithCSRF from '../support/getHeadersWithCSRF'

import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            HTMLText: '',
            name: '',
            catalogName: '',
            fullCatalogName: '',
            likesCount: 0,
        }
    }
    componentDidMount() {
        axios.get(`/api/blog/${this.props.match.params.blogID}/`)
            .then(data => this.setState({ likesCount: data.data.likes_count, isLoading: false, HTMLText: data.data.HTMLText, name: data.data.title }))
            .catch(() => this.setState({ isLoading: false }))
        axios.get(`/api/blog/${this.props.match.params.blogID}/get_names/`)
            .then(data => this.setState({ fullCatalogName: data.data.full_catalog_name, catalogName: data.data.catalog_name }))
            .catch(() => this.setState({ isLoading: false }))
    }
    likeClickHandler() {
        const headers = getHeadersWithCSRF()
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.post(`/api/blog/${this.props.match.params.blogID}/likes/`, null, headers)
            .then(data => this.setState({ likesCount: data.data.likes }))
            .catch(err => console.log(err))
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
                <div style={{ marginTop: "4rem" }} className="border-top border-solid mb-4"></div>
                <Badge badgeContent={this.state.likesCount} color="primary">
                    <h5 className='mr-2'>Понравилось? Ставь:</h5>
                    <FavoriteIcon onClick={this.likeClickHandler.bind(this)} style={{ cursor: "pointer" }} />
                </Badge>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
})

export default connect(mapStateToProps, null)(Blog)