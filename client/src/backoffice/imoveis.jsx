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
    FileInput,
    NumberInput,
    ImageField,
    NumberField,
    SimpleForm,
    SelectInput,
    TextInput,
    Create,
    useStore 
} from 'react-admin';

import { useWatch } from 'react-hook-form';

const parishes = {
    'Câmara de Lobos':  [
        {id:'Câmara de Lobos',name:'Câmara de Lobos'},
        {id:'Curral das Freiras',name:'Curral das Freiras'},
        {id:'Estreito de Câmara de Lobos',name:'Estreito de Câmara de Lobos'},
        {id:'Jardim da Serra',name:'Jardim da Serra'},
        {id:'Quinta Grande',name:'Quinta Grande'},
     ],
    'Funchal': [
        {id:'Imaculado Coração de Maria',name:'Imaculado Coração de Maria'},
        {id:'Monte',name:'Monte'},
        {id:'Santa Luzia',name:'Santa Luzia'},
        {id:'Santo António',name:'Santo António'},
        {id:'São Gonçalo',name:'São Gonçalo'},
        {id:'São Martinho',name:'São Martinho'},
        {id:'S. Pedro',name:'S. Pedro'},
        {id:'Santa Maria Maior',name:'Santa Maria Maior'},
        {id:'S. Roque',name:'S. Roque'},
        {id:'Sé',name:'Sé'},
    ],
    'Machico': [
        {id:'Água de Pena',name:'Água de Pena'},
        {id:'Caniçal',name:'Caniçal'}, 
        {id:'Machico',name:'Machico'}, 
        {id:'Porto da Cruz',name:'Porto da Cruz'},
        {id:'Santo António da Serra',name:'Santo António da Serra'}
     ],
    'Porto Moniz': [
        {id:'Achadas da Cruz',name:'Achadas da Cruz'},
        {id:'Porto Moniz',name:'Porto Moniz'},
        {id:'Ribeira da Janela',name:'Ribeira da Janela'},
        {id:'Seixal',name:'Seixal'}
     ],
    'Porto Santo': [
        {id:'Porto Santo',name:'Porto Santo'}
     ],
     'Santa Cruz': [
        {id:'Camacha',name:'Camacha'},
        {id:'Caniço',name:'Caniço'},
        {id:'Gaula',name:'Gaula'},
        {id:'Santa Cruz',name:'Santa Cruz'},
        {id:'Santo António da Serra',name:'Santo António da Serra'}
     ],
    'Santana': [
        {id:'Arco de São Jorge',name:'Arco de São Jorge'},
        {id:'Faial',name:'Faial'},
        {id:'Ilha',name:'Ilha'},
        {id:'São Jorge',name:'São Jorge'},
        {id:'São Roque do Faial',name:'São Roque do Faial'}
     ],
    'São Vicente': [
        {id:'Boa Ventura',name:'Boa Ventura'},
        {id:'Ponta Delgada',name:'Ponta Delgada'},
        {id:'São Vicente',name:'São Vicente'}
     ]
};

export const ImoveisList = (props) => {
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
                    <NumberField source="rooms" />
                    <NumberField source="bathrooms" />
                    <NumberField source="livingrooms" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

export const ImoveisEdit = props => {
    
    const localities =  [
        {id:'Câmara de Lobos',name:'Câmara de Lobos'},
        {id:'Funchal',name:'Funchal'},
        {id:'Machico',name:'Machico'},
        {id:'Porto Moniz',name:'Porto Moniz'},
        {id:'Porto Santo',name:'Porto Santo'},
        {id:'Santa Cruz',name:'Santa Cruz'},
        {id:'Santana',name:'Santana'},
        {id:'São Vicente',name:'São Vicente'}
    ];

    const toChoices = items => items.map(item => ({ id: item.id, name: item.name }));

    const ParishInputs = props => {
        const locality = useWatch({ name: 'locality' });
        //const values = getValues();
    
        return (
            <SelectInput
                choices={locality ? toChoices(parishes[locality]) : []}
                {...props}
            />
        );
    };

    return(
        <Edit {...props}>
            <SimpleForm>
            <TextField source="id" />
                <SelectInput source="locality"  choices={toChoices(localities)} />       
                <ParishInputs source="parish"/>
                <TextInput source="price" />
                <NumberInput source="rooms" />
                <NumberInput source="bathrooms" />
                <NumberInput source="livingrooms" />
                <FileInput source="img" label="Related files" accept="image/png, image/jpeg, image/jpg" >
                    <ImageField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Edit>
    )
};


export const ImoveisCreate = props => {
    const [locality, setLocality] = useStore('imoveis.locality');
    
    const handleLocality = (e) => {
        setLocality(e.target.value)
    }

    return (
        <Create {...props}>
            <SimpleForm>
            <TextField source="id" />
                <SelectInput source="locality" onChange={handleLocality} choices={[
                    {id:'Câmara de Lobos',name:'Câmara de Lobos'},
                    {id:'Funchal',name:'Funchal'},
                    {id:'Machico',name:'Machico'},
                    {id:'Porto Moniz',name:'Porto Moniz'},
                    {id:'Porto Santo',name:'Porto Santo'},
                    {id:'Santa Cruz',name:'Santa Cruz'},
                    {id:'Santana',name:'Santana'},
                    {id:'São Vicente',name:'São Vicente'}
                ]} />
                <SelectInput source="parish" choices={  !locality ? [{ id: 1, name: '' }] : parishes[locality] }/>
                <TextInput source="price" />
                <TextInput source="tipology" />
                <NumberInput source="rooms" />
                <NumberInput source="bathrooms" />
                <NumberInput source="livingrooms" />
                <FileInput source="files" multiple={true} label="Related files" accept="image/png, image/jpeg, image/jpg" >
                    <ImageField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Create>
    )
};