// in src/Contacts.js
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

const ContactsTitle = () => {
    const record = useRecordContext();
    return <span>Contacts {record ? `"${record.title}"` : ''}</span>;
};

export const ContactsList = (props) => {
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
                    <TextField source="email" />
                    <TextField source="message" />
                </Datagrid>
            )}
        </List>
    );
}