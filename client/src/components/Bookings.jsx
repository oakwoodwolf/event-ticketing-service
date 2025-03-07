
import { Datagrid, List, ReferenceField, TextField, TextInput, ChipField, Edit, Show, SimpleShowLayout, SimpleForm, ReferenceInput, Create, SearchInput, DateField  } from 'react-admin';
const bookingFilters = [
    <SearchInput source="q" alwaysOn />,
];
export const BookingList = () => (
    <List filters={bookingFilters}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="eventid" reference='events' link='show'/>
            <ReferenceField source="userid" reference='users' link='show'/>
            <DateField source="datebooked"/>
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
            <DateField source="datebooked"/>
            <ChipField source="paid" />
        </SimpleShowLayout>
    </Show>
);
export const BookingEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{disabled: true}} />
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