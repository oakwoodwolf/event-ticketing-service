import { Datagrid, Create, List, NumberField, NumberInput, TextField, Edit, Show, SimpleShowLayout, SimpleForm, TextInput } from 'react-admin';

export const EventList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <NumberField source="views" />
        </Datagrid>
    </List>
);

export const EventShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
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
        </SimpleForm>
    </Edit>
);
export const EventCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" />
            <NumberInput source="views" />
        </SimpleForm>
    </Create>
);