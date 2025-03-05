
import { Datagrid, List, ReferenceField, TextField, TextInput, ChipField, Edit, Show, SimpleShowLayout, SimpleForm, ReferenceInput, Create  } from 'react-admin';
const bookingFilters = [
    <ReferenceInput source="userId" label="User" reference="users" />,
    <ReferenceInput source="eventId" label="Event" reference="events" />,
];
export const BookingList = () => (
    <List filters={bookingFilters}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="eventid" reference='events' link='show'/>
            <ReferenceField source="userid" reference='users' link='show'/>
            <TextField source="paid" />
        </Datagrid>
    </List>
);

export const BookingShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="eventid" reference='events' link='show'/>
            <ReferenceField source="userid" reference='users' link='show'/>
            <ChipField source="paid" />
        </SimpleShowLayout>
    </Show>
);
export const BookingEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="eventid" reference='events' />
            <ReferenceInput source="userid" reference='users'/>
            <TextInput source="paid" />
        </SimpleForm>
    </Edit>
);

export const BookingCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="eventid" reference='events' />
            <ReferenceInput source="userid" reference='users'/>
            <TextInput source="paid" />
        </SimpleForm>
    </Create>
);