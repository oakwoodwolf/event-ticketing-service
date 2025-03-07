import { Datagrid, Create, List, NumberField, NumberInput, TextField, Edit, Show, SimpleShowLayout, SimpleForm, TextInput, SearchInput, DateInput, DateTimeInput, DateField, ImageInput, ImageField } from 'react-admin';

const postFilters = [
    <SearchInput source="q" alwaysOn/>
];

export const EventList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="timestart" />
            <DateField source="timeend" />
            <NumberField source="views" />
        </Datagrid>
    </List>
);

export const EventShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="timestart" />
            <DateField source="timeend" />
            <NumberField source="views" />
        </SimpleShowLayout>
    </Show>
);
export const EventEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{disabled: true}} />
            <TextInput source="title" />
            <NumberInput source="views" />
            <DateTimeInput source="timestart" />
            <DateTimeInput source="timeend" />
        </SimpleForm>
    </Edit>
);
export const EventCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" />
            <DateTimeInput source="timestart" />
            <DateTimeInput source="timeend" />
            <NumberInput source="views" />
        </SimpleForm>
    </Create>
);