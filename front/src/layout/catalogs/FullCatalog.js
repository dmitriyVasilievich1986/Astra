import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page404 from '../support/page404'
import axios from 'axios'
import { connect } from 'react-redux'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

class FullCatalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catalog: [],
            fullCatalogName: "",
            isLoading: true,
        }
    }
    componentDidMount() {
        axios.get(`/api/catalog/${this.props.match.params.catalogName}/catalog_by_id/`)
            .then(data => this.setState({ isLoading: false, catalog: data.data.catalog, fullCatalogName: data.data.full_catalog_name }))
            .catch(() => this.setState({ isLoading: false }))
    }
    render() {
        if (this.state.catalog.length == 0) {
            if (this.state.isLoading)
                return ""
            return Page404()
        }
        return (
            <div className='container mt-4'>
                <Breadcrumbs aria-label="breadcrumb" className='pb-3 mb-4 mt-2 pt-2 border-bottom border-solid'>
                    <Link to='/'>Главная</Link>
                    <a style={{ color: "gray" }}>{this.state.fullCatalogName}</a>
                </Breadcrumbs>
                <ul className='list-group list-group-flush'>
                    {this.state.catalog.map((c, i) => <li key={i} className="list-group-item"><Link to={`/${this.props.match.params.catalogName}/${c.name}`}>{c.title}</Link></li>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fullCatalog: state.catalog.fullCatalog,
})

export default connect(mapStateToProps, null)(FullCatalog)