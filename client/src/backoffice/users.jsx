// in src/Users.js
import * as React from "react";
import { useMediaQuery } from '@mui/material';
import { 
    List, 
    SimpleList,
    Datagrid, 
    TextField, 
    ReferenceField, 
    EditButton,
    useRecordContext,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Create
} from 'react-admin';

const UsersTitle = () => {
    const record = useRecordContext();
    return <span>Users {record ? `"${record.title}"` : ''}</span>;
};

export const UsersList = (props) => {
    console.log('props: ', props)
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => (
                        <ReferenceField label="id" source="id" reference="id">
                            <TextField source="locality" />
                        </ReferenceField>
                    )}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="created_at" />
                    <TextField source="name" />
                    <TextField source="username" />
                    <TextField source="password" />
                    <TextField source="email" />
                    <TextField source="mobile_number" />
                    <TextField source="zip_code" />
                    <TextField source="vat_number" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export const UsersEdit = () => (
    <Edit title={UsersTitle} >
        <SimpleForm>
        <TextField source="id" />
            <ReferenceField label="id" source="id" reference="id">
                <SelectInput source="locality" />
            </ReferenceField>
            <TextInput source="price" />
            <SelectInput source="parish" />
            <TextInput source="rooms" />
            <TextInput source="bathrooms" />
            <TextInput source="livingrooms" />
            <TextInput source="img" />
        </SimpleForm>
    </Edit>
);

export const UsersCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="id" />
            <ReferenceField label="id" source="id" reference="id">
                <SelectInput source="locality" />
            </ReferenceField>
            <TextInput source="price" />
            <SelectInput source="parish" />
            <TextInput source="rooms" />
            <TextInput source="bathrooms" />
            <TextInput source="livingrooms" />
            <TextInput source="img" />
        </SimpleForm>
    </Create>
);