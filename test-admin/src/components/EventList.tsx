import { Datagrid, List, NumberField, TextField } from 'react-admin';

export const EventList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <NumberField source="views" />
        </Datagrid>
    </List>
);