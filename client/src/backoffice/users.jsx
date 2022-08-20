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
                            <TextField source="email" />
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
    <Edit>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="created_at" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="email" />
            <TextField source="mobile_number" />
            <TextField source="zip_code" />
            <TextField source="vat_number" />
        </SimpleForm>
    </Edit>
);

export const UsersCreate = props => (
    <Create {...props}>
        <SimpleForm>
        <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="email" />
            <TextField source="mobile_number" />
            <TextField source="zip_code" />
            <TextField source="vat_number" />
        </SimpleForm>
    </Create>
);