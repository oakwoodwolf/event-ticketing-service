
import { Datagrid, List, ReferenceField, ReferenceInput, TextField } from 'react-admin';

export const BookingList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="eventid" reference='events' link='show'/>
            <ReferenceField source="userid" reference='users' link='show'/>
            <TextField source="paid" />
        </Datagrid>
    </List>
);