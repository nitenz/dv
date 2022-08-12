import { PostList, PostEdit, PostCreate } from '../posts/posts';
import PostIcon from '@mui/icons-material/Book';

import Dashboard from '../Dashboard';
import authProvider from '../authProvider';

import { Admin, Resource } from 'react-admin';

import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminPage = () => {

    return(
        <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource icon={PostIcon} name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
        </Admin>
    )
}

export default AdminPage;