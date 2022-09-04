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
            {permissions => [
                // Restrict access to the edit and remove views to admin only
                <Resource name="imoveis" icon={ImoveisIcon} list={ImoveisList} edit={ImoveisEdit} create={ImoveisCreate}  />,
                // Only include the categories resource for admin users
                permissions === 'admin' || permissions === 'super-admin'
                    ?  <Resource name="users" icon={UserIcon} list={UsersList} edit={UsersEdit} create={UsersCreate}  />
                    : null,
                permissions === 'admin' || permissions === 'super-admin'
                    ?   <Resource name="contacts" icon={ContactIcon} list={ContactsList} />
                    : null,
            ]}
        </Admin>
    )
}

export default AdminPage;