const express = require('express'),
      { Client } = require('pg'),
      dbQueries = require( './config/db-queries.js'),
      db = require('./config/db.js'),
      app = express(),
      port = 8080,
      cors = require('cors'),
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser'),
      nodemailer = require('nodemailer'),
      multer = require('multer'),
      upload = multer(),
      credentials = {
        user: 'postgres',
        host: 'host.docker.internal',
        database: 'imobiliaria',
        password: 'postgrespw',
        port: 49153,
      };

const jsonParser = bodyParser.json()
const client = new Client(credentials);

const saveImoveisImages = (imovelPath, imovel ) => {
 
  return new Promise((resolve, reject) => {
    let tempFiles = [];

    fs.readdir( path.join(__dirname, imovelPath ), (err, files) => {

      files.map( (img,idx) => {
        tempFiles.push( {src: 'http://localhost:8080/imoveis/'+imovel.id+'/'+img, title: img.split('.')[0]} )

        if(idx === files.length-1){
          imovel.img=tempFiles;
          resolve(imovel)
        }
      })
    });
  })
}

const createImovelData = (imoveis) => {
  let imoveisList = [];
  const nElements = imoveis.length;

  return new Promise((resolve, reject) => {

    imoveis.map( item => {
      const imovelPath = 'public/imoveis/'+item.id;

      saveImoveisImages(imovelPath, item).then( imovel => {
        imoveisList.push(imovel);

        if(imoveisList.length === nElements){
          resolve(imoveisList)
        }
      });
    })
  })
}

app.use(cors())
//app.use(upload.array()); 

db.initializeDataTable();

//turn public imoveis folter
app.use('/imoveis', express.static('public/imoveis'))


app.post('/add/images', upload.array('file'), function (req,res) {
  const imageFiles = req.files,
        id = req.body.id;

  imageFiles.map( (img, idx) => {
      const target_path = 'public/imoveis/' + id + '/' + img.originalname;

      fs.writeFile( target_path, img.buffer, err => {
        if (err) {
          console.error(err);
        }
      });
      if( idx === imageFiles.length-1) res.send({msg: 'Images uploaded!'})
  })
});

/****************************** IMOVEIS CRUD  ***********************************/
app.get('/imoveis/', (req,res) => {
  dbQueries.getImovel().then( data => {
    createImovelData(data.rows).then( imoveis =>{
      res.send({data:imoveis, total: imoveis.length})
    });
  })
});

app.get('/imoveis/:id', (req,res) => {
  const id = req.params.id;

  dbQueries.getImovel(id).then( data => {
    createImovelData(data.rows).then( imoveis =>{
      console.log('imoveis: ', imoveis)
      res.send({data:imoveis[0]})
    });
  })
});

app.post('/imoveis', jsonParser, function (req, res) {
  const data = req.body;

  console.log('data: ', data)
  dbQueries.createImovel(data).then( imovel => {
    const imovelPath = 'public/imoveis/'+imovel.rows[0].id,
          dir = path.join(__dirname, imovelPath );

    fs.mkdirSync(dir);
    res.send({id:imovel.rows[0].id})
  })
})

app.post('/edit/imovel', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.updateImovel(data).then( imovel => {
    res.send({id: imovel.rows[0].id});
  })
})

app.delete('/imoveis/', jsonParser, function (req, res) {
  const data = req.body.id;
  let limit = data.length;
  
  if(Array.isArray(data) ){
    data.map( (id, idx) => {

      dbQueries.deleteImovel(id);
      if(idx === limit){
        res.send( {msg: 'Imovel deleted '+ data });
      }
    })
  }else{
    dbQueries.deleteImovel(data).then( resp => {
      res.send( {msg: 'Imovel deleted '+ resp.rows[0] });
    })
  }
})
/****************************** END IMOVEIS CRUD  ***********************************/

/****************************** USERS CRUD  ***********************************/
app.get('/users/', (req,res) => {
  dbQueries.getUser().then( users => {
    res.send({data:users.rows, total: users.rowCount})
  })
});

app.get('/users/:id', (req,res) => {
  const id = req.params.id;
  
  dbQueries.getUser(id).then( users => {
    res.send({data:users.rows[0]})
  })
});

app.post('/users', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.createUser(data).then( user => {
    console.log('dbq: ',  user.rows[0].id )
    res.send({id: user.rows[0].id});
  })
})

app.put('/users/:id', jsonParser, function (req, res) {
  const data = req.body;
  const id = req.params.id;
  
  console.log('data: ',data)
  
  dbQueries.updateUser(data).then( user => {
    res.send({id: user.rows[0]});
  })
})

app.delete('/users/', jsonParser, function (req, res) {
  const data = req.body.id;
  let limit = data.length;
  
  if(Array.isArray(data) ){
    data.map( (id, idx) => {

      dbQueries.deleteUser(id);
      if(idx === limit){
        res.send( {msg: 'user deleted '+ data });
      }
    })
  }else{
    dbQueries.deleteUser(data).then( resp => {
      res.send( {msg: 'user deleted '+ resp.rows[0] });
    })
  }
})
/****************************** END USERS CRUD  ***********************************/

/****************************** CONTACTS CRUD  ***********************************/
app.get('/contacts/', (req,res) => {
  const id = req.params.id || '';
 
  dbQueries.getContact().then( contact => {
    res.send({data:contact.rows, total: contact.rowCount})
  })
});

app.post('/add/contact', jsonParser, function (req, res) {
  const data = req.body;

  dbQueries.createContact(data).then( data => {
    if(data) res.send({message:'sucess!!'})
  })
})

app.delete('/contacts/', jsonParser, function (req, res) {
  const data = req.body.id;
  let limit = data.length;
  
  if(Array.isArray(data) ){
    data.map( (id, idx) => {

      dbQueries.deleteContact(id);
      if(idx === limit){
        res.send( {msg: 'Imovel deleted '+ data });
      }
    })
  }else{
    dbQueries.deleteContact(data).then( resp => {
      res.send( {msg: 'Imovel deleted '+ resp.rows[0] });
    })
  }
})
/****************************** END CONTACTS CRUD  ***********************************/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})