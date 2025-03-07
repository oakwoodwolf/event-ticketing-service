import { List, Datagrid, TextField, SearchInput, EmailField, ChipField, Show, SimpleShowLayout, Edit, SimpleForm, TextInput, Create } from "react-admin";

const postFilters = [
    <SearchInput source="q" alwaysOn/>
];

export const UserList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <ChipField source="role" />
        </Datagrid>
    </List>
);

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="sms" />
            <ChipField source="role" />
        </SimpleShowLayout>
    </Show>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{disabled: true}}/>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="sms" />
            <TextInput source="role" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="sms" />
            <TextInput source="role" />
        </SimpleForm>
    </Create>
);