import * as React from 'react';
import {
    Grid, List, ListItemButton,
    ListItemText,
} from '@mui/material';
import {useEffect} from 'react';

function ListComponent(props) {

    const [dense] = React.useState(true);
    const [secondary] = React.useState(true);
    const [list, setList] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const divideEachItem = props.divide;

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        props.callback(list[index]);
    };

    useEffect(() => {
        setList(props.listData);
    }, [props.listData]);

    return (

        <Grid container>
            <Grid item xs={12}>
                <List dense={dense}>
                    {list?.length > 0 && list.map(x => (
                        <ListItemButton
                            key={x.id}
                            selected={selectedIndex === list.indexOf(x)}
                            onClick={(event) => handleListItemClick(event, list.indexOf(x))}
                            divider={divideEachItem}
                        >
                            <ListItemText
                                primary={'Name: ' + x.value}
                                secondary={secondary ? 'Id: ' + x.id : null}
                            />
                        </ListItemButton>))
                    }
                </List>
            </Grid>
        </Grid>
    );
}

export default ListComponent;