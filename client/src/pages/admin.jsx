import { ImoveisList, ImoveisEdit, ImoveisCreate } from '../backoffice/imoveis';
import { UsersList, UsersEdit, UsersCreate } from '../backoffice/users';
import {ContactsList} from '../backoffice/contact';
import authProvider from '../backoffice/authProvider'
import ImoveisIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import ContactIcon from '@mui/icons-material/Message';

import './admin.scss'

import { Admin, Resource } from 'react-admin';

import dataProvider from '../backoffice/dataProvider';

const AdminPage = () => {
    return(
        <Admin authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="imoveis" icon={ImoveisIcon} list={ImoveisList} edit={ImoveisEdit} create={ImoveisCreate}  />
            <Resource name="users" icon={UserIcon} list={UsersList} edit={UsersEdit} create={UsersCreate}  />
            <Resource name="contacts" icon={ContactIcon} list={ContactsList} />
        </Admin>
    )
}

export default AdminPage;