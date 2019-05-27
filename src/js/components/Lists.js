import React, {Component, Fragment} from "react";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SolidCloud from '@material-ui/icons/Cloud';
// import WS from "../utils/socket";


export class SimpleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            filteredList: [],
        };

        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleListItemClick(value, index) {
        const {id} = value;
        this.setState({id: value.id});
        this.props.click({value});
        // WS.connectToDevice(value.id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.list.length && this.state.filteredList.length === 0) {
            this.setState({filteredList: nextProps.list});
        }
    }

    handleFilter(event) {
        let list = !!this.props.list ? this.props.list : [];

        list = list.filter(function (item) {
            return item.label.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({filteredList: list})
    }

    render() {
        const {filteredList, id} = this.state;
        return (

            <Fragment>
                <div className={'search-container'}>
                    <i className="fa fa-search searchIcon"/>
                    <input className={'search-input'} type={'text'} placeholder={'Buscar...'}
                           onChange={this.handleFilter}/>
                </div>
                <List style={{float: "left", width: '100%'}}>
                    {filteredList.map((value, index) => (
                        <ListItem button key={index} selected={index === this.state.rowIndex}
                                  onClick={() => {
                                      this.handleListItemClick(value, index)
                                  }}
                                  className={(value.id === id ? 'Item-selected' : '')}>
                            <ListItemIcon>
                                <SolidCloud/>
                            </ListItemIcon>
                            <ListItemText primary={value.label.replace(/_/g, " ")}/>
                        </ListItem>
                    ))}
                </List>
            </Fragment>

        )
    }
}
