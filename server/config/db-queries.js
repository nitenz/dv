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

module.exports = {
    createUser : async function (user) {
        const text = `
          INSERT INTO users (name, email, username, password, address, mobile_number, zip_code, vat_number)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `;
        
        const values = [user.name, user.email, user.username, user.password, user.address, user.mobile_number, user.zip_code, user.vat_number];
        return pool.query(text, values);
      },
    getUser : async function (field, value) {
        const text = `SELECT * FROM users WHERE ` + field + ` = $1`;
        const values = [value];
        return pool.query(text, values);
      },
    updateUser: async function (user) {
        const text = `UPDATE users SET name = $2, email = $3, username = $4, address = $5, mobile_number = $6, zip_code = $7, vat_number = $8 WHERE id = $1`;
        const values = [user.id, user.name, user.email, user.username, user.address, user.mobile_number, user.zip_code, user.vat_number];
        return pool.query(text, values);
      },
    deleteUser: async function (userId) {
        const text = `DELETE FROM users WHERE id = $1`;
        const values = [userId];
        return pool.query(text, values);
      },
    createImovel:  async function (imovel) {
        const text = `
          INSERT INTO imoveis (location, price, tipology, rooms, bathRooms, livingRooms)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        `;
        const values = [imovel.location, imovel.price, imovel.tipology, imovel.rooms, imovel.bathRooms, imovel.livingRooms];
        return pool.query(text, values);
    },
    getImovel : async function (id) {
        const text = id ? `SELECT * FROM imoveis WHERE id= $1` : `SELECT * FROM imoveis`;
        const values = [id];
        return id ? pool.query(text, values) : pool.query(text);
    },
    updateImovel:  async function (imovel) {
        const text = `UPDATE imoveis SET location = $2, price = $3, tipology = $4, rooms = $5, bathRooms= $6, livingRooms = $7 WHERE id = $1`;
        const values = [imovel.id, imovel.location, imovel.price, imovel.tipology, imovel.rooms, imovel.bathRooms, imovel.livingRooms]
        return pool.query(text, values);
    },
    deleteImovel: async function (imovelId) {
        const text = `DELETE FROM imoveis WHERE id = $1`;
        const values = [imovelId];
        return pool.query(text, values);
    },
    createContact:  async function (contact) {
        const text = `
          INSERT INTO contacts (name, email, message)
          VALUES ($1, $2, $3)
          RETURNING id
        `;
        const values = [contact.name, contact.email, contact.message];
        return pool.query(text, values);
    },
    getContact : async function (id) {
        const text = id ? `SELECT * FROM contacts WHERE id= $1` : `SELECT * FROM imoveis`;
        const values = [id];
        return id ? pool.query(text, values) : pool.query(text);
    },
    deleteContact: async function (contactId) {
        const text = `DELETE FROM contacts WHERE id = $1`;
        const values = [contactId];
        return pool.query(text, values);
    }
  //retrive admin info
  /*async function getAdmin(userId) {
    const text = `SELECT * FROM admin WHERE id = $1`;
    const values = [userId];
    return pool.query(text, values);
  }
  
  //create new admin
  async function addAdmin(userId, admin_type) {
    const text = `INSERT INTO admin (id, admin_type)
    VALUES ($1, $2)
    RETURNING id`;
    
    const values = [userId, admin_type];
    return pool.query(text, values);
  }*/
}