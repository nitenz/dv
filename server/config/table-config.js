const { Pool, Client } = require("pg");

const credentials = {
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'imobiliaria',
  password: 'postgrespw',
  port: 49153,
};

const pool = new Pool(credentials);
const client = new Client(credentials);

const createTables = () => {

  const query_imoveis = `
  CREATE TABLE imoveis (
      id BIGSERIAL,
      user_id int,
      locality varchar,
      parish varchar,
      price varchar,
      tipology varchar,
      rooms int,
      bathrooms int,
      livingrooms int
  );
  `;

  const query_users = `
  CREATE TABLE users (
      id BIGSERIAL,
      created_at TIMESTAMP DEFAULT NOW(),
      name varchar,
      username varchar,
      password varchar,
      email varchar, 
      mobile_number int, 
      zip_code varchar, 
      vat_number int
  );
  `;

  const query_contacts = `
  CREATE TABLE contacts (
      id BIGSERIAL,
      created_at TIMESTAMP DEFAULT NOW(),
      name varchar,
      email varchar,
      message varchar
  );
  `;

  const query_admin = `
  CREATE TABLE admin (
      id BIGSERIAL,
      user_id int,
      admin_type int
  );
  `;

  const tables= [query_users, query_imoveis, query_admin, query_contacts, query_admin];

  //Establish connection to database
  client.connect()
  tables.forEach( (query, idx) => {
    client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
        }
    })
  }, () => {
    client.end()
    console.log('connection to datable closed')
  })
}
module.exports = {
  initializeDataTable : (async () => {
    try{
      const users = `SELECT * FROM users`;
      const imoveis = `SELECT * FROM imoveis`;
  
      const getUsers = await pool.query(users);
      const getImoveis = await pool.query(imoveis);

    }catch(err){
      console.error(err)
  
      createTables(client); //Create tables
      console.log('Tables created!')
    }
  })
}
