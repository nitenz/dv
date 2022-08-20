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

    fs.readdir( path.join(__dirname, imovelPath ), (err, files) => {
      imovel.img=files;
      resolve(imovel)
    });

  })
}

const createImovelData = ( imoveis, action ) => {
  let imoveisList = [];
  const nElements = imoveis.length;

  return new Promise((resolve, reject) => {

    imoveis.map( item => {
      const imovelPath = 'public/'+action+'/'+item.id;

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

app.post('/add/imovel', jsonParser, function (req, res) {
  const data = req.body;

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

app.post('/del/imovel', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.deleteImovel(data.id).then( resp => {
    res.send( {msg: 'imovel deleted '+ resp });
  })
})

app.post('/add/user', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.createUser(data).then( user => {
    console.log('dbq: ',  user.rows[0].id )
    res.send({id: user.rows[0].id});
  })
})

app.post('/edit/user', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.updateUser(data).then( user => {
    res.send({id: user.rows[0].id});
  })
})

app.post('/del/user', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.deleteUser(data.id).then( resp => {
    res.send( {msg: 'user deleted '+ resp });
  })
})

app.post('/add/contact', jsonParser, function (req, res) {
  const data = req.body;

  dbQueries.createContact(data).then( data => {
    if(data) res.send({message:'sucess!!'})
  })
})

app.post('/del/contact', jsonParser, function (req, res) {
  const data = req.body;

  dbQueries.deleteContact(data.id).then( data => {
    if(data) res.send({message:'sucess!!'})
  })
})

app.get('/imoveis/:id', (req,res) => {
  const id = req.params.id || '';

  console.log('id: ', id)
    dbQueries.getImovel(id).then( data => {
      res.send({data:data.rows[0]})
    })
});

app.get('/users/:id', (req,res) => {
  const id = req.params.id || '';

  dbQueries.getUser(id).then( data => {
    res.send({data:data.rows[0]})
  })
});

app.use('/:action/', (req,res) => {
  const action = req.params.action.toLocaleLowerCase();
  if(action === 'imoveis'){
    dbQueries.getImovel().then( data => {
      createImovelData(data.rows, action).then( imoveis =>{
        res.send({data:imoveis, total: imoveis.length})
      });
    })
  }else if(action === 'contacts'){
    dbQueries.getContact().then( data => {

      createImovelData(data.rows, action).then( imoveis =>{
        res.send({data:imoveis, total: imoveis.length})
      });
    })
  }else if(action === 'users'){
    dbQueries.getUser().then( data => {
      createImovelData(data.rows, action).then( imoveis =>{
        res.send({data:imoveis, total: imoveis.length})
      });
    })
  }
});

app.use( '/:action/:id', (req,res) => {
  const action = req.params.action.toLocaleLowerCase();
  const id = req.params.id || '';
  console.log('id: ', id )
  if(action === 'imoveis'){
    dbQueries.getImovel(id).then( data => {
      createImovelData(data.rows[0], action).then( imoveis =>{
        res.send({data:imoveis.r, total: imoveis.length})
      });
    })
  }else if(action === 'contacts'){
    dbQueries.getContact().then( data => {

      createImovelData(data.rows, action).then( imoveis =>{
        res.send({data:imoveis, total: imoveis.length})
      });
    })
  }else if(action === 'users'){
    dbQueries.getUser().then( data => {
      createImovelData(data.rows, action).then( imoveis =>{
        res.send({data:imoveis, total: imoveis.length})
      });
    })
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})