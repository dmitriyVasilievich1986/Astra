import React from 'react'
import { connect } from 'react-redux'
import { setSidePanelStatus } from '../../actions/actions'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';


function Panel(props) {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={props.sidePanelOpen}
        >
            <div style={{ "display": "flex", "alignItems": 'center', "justifyContent": "flex-end" }}>
                <IconButton onClick={() => props.setSidePanelStatus(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List style={{ "width": "240px" }}>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    sidePanelOpen: state.mainProperties.sidePanelOpenStatus
})

export default connect(mapStateToProps, { setSidePanelStatus })(Panel)