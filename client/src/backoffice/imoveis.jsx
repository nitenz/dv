// in src/Imoveis.js
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

const ImoveisTitle = () => {
    const record = useRecordContext();
    return <span>Imoveis {record ? `"${record.title}"` : ''}</span>;
};

export const ImoveisList = (props) => {
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
                    <TextField source="locality" />
                    <TextField source="price" />
                    <TextField source="parish" />
                    <TextField source="rooms" />
                    <TextField source="bathrooms" />
                    <TextField source="livingrooms" />
                    <TextField source="img" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export const ImoveisEdit = () => (
    <Edit title={ImoveisTitle} >
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

export const ImoveisCreate = props => (
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