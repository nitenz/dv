const { Pool, Client } = require("pg");

const credentials = {
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
};

const pool = new Pool(credentials);
const client = new Client(credentials);

module.exports = {
    createUser : async function (user) {
        const text = `
          INSERT INTO users (name, email, username, password, mobile_number, zip_code, vat_number)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
        `;
        
        const values = [user.name, user.email, user.username, user.password, Number(user.mobile_number), user.zip_code, Number(user.vat_number)];
        return pool.query(text, values);
    },
    getUserByFieldAndValue : async function (field, value) {
      const text = `SELECT * FROM users WHERE ` + field + ` = $1`;
      const values = [value];
      return pool.query(text, values);
    },
    getUser : async function (id) {
        const text = id ? `SELECT * FROM users WHERE id= $1` : `SELECT * FROM users`;
        const values = [id];
        return id ? pool.query(text, values) : pool.query(text);
    },
    updateUser: async function (user) {
        const text = `UPDATE users SET name = $2, email = $3, username = $4, password= $5, mobile_number = $6, zip_code = $7, vat_number = $8 WHERE id = $1`;
        const values = [user.id, user.name, user.email, user.username, user.password, user.mobile_number, user.zip_code, user.vat_number];
        return pool.query(text, values);
    },
    deleteUser: async function (userId) {
        const text = `DELETE FROM users WHERE id = $1`;
        const values = [userId];
        return pool.query(text, values);
    },
    createImovel:  async function (imovel) {
        const text = `
          INSERT INTO imoveis (locality, parish, price, tipology, rooms, bathrooms, livingrooms, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `;
        console.log('create imovel data: ', imovel)
        const values = [imovel.locality, imovel.parish, imovel.price, imovel.tipology, Number(imovel.rooms), Number(imovel.bathrooms), Number(imovel.livingrooms), Number(imovel.userId)];
        return pool.query(text, values);
    },
    getImovel : async function (id) {
        const text = id ? `SELECT * FROM imoveis WHERE id= $1` : `SELECT * FROM imoveis`;
        const values = [id];
        return id ? pool.query(text, values) : pool.query(text);
    },
    updateImovel:  async function (imovel) {
        const text = `UPDATE imoveis SET locality = $2, parish = $3, price = $4, tipology = $5, rooms = $6, bathrooms= $7, livingrooms = $8, user_id = $9 WHERE id = $1`;
        const values = [imovel.id, imovel.locality, imovel.parish, imovel.price, imovel.tipology, imovel.rooms, imovel.bathrooms, imovel.livingrooms, imovel.userId]
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
        const text = id ? `SELECT * FROM contacts WHERE id= $1` : `SELECT * FROM contacts`;
        const values = [id];
        return id ? pool.query(text, values) : pool.query(text);
    },
    deleteContact: async function (contactId) {
        const text = `DELETE FROM contacts WHERE id = $1`;
        const values = [contactId];
        return pool.query(text, values);
    },
    getAdmin: async function(userId) {
      const text = `SELECT * FROM admin WHERE user_id = $1`;
      const values = [userId];
      return pool.query(text, values);
    },
    addAdmin: async function(userId, admin_type) {
      const text = `INSERT INTO admin (id, admin_type)
      VALUES ($1, $2)
      RETURNING id`;
      
      const values = [Number(userId), Number(admin_type)];
      return pool.query(text, values);
    },
    getImoveisByUser: async function(userId) {
      const text = `SELECT * FROM imoveis WHERE user_id= $1`;
      const values = [userId];
      return pool.query(text, values);
    }
}