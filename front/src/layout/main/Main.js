import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

function Main(props) {
    return (
        <div className='container mt-4'>
            <ul className='list-group list-group-flush'>
                {props.fullCatalog.map((cat, i) => <li className='list-group-item' key={i}><Link to={cat.name}>{cat.title}</Link></li>)}
            </ul>
        </div>
    )
}

const mapStateToPros = state => ({
    fullCatalog: state.catalog.fullCatalog,
    catalog: state.catalog.catalog,
})

export default connect(mapStateToPros, null)(withRouter(Main))