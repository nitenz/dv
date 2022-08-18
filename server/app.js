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

  console.log('data: ', data )
  dbQueries.createImovel(data).then( imovel => {
    const imovelPath = 'public/imoveis/'+imovel.rows[0].id,
          dir = path.join(__dirname, imovelPath );

    let filePath = '';

    fs.mkdirSync(dir);

    res.send({id:imovel.rows[0].id})
  })
})

app.post('/add/user', jsonParser, function (req, res) {
  const data = req.body;
  
  dbQueries.createUser(data).then( user => {
    console.log('dbq: ',  user.rows[0].id )
    res.send({id: user.rows[0].id});
  })
})

app.post('/contact', jsonParser, function (req, res) {
  const data = req.body;

  dbQueries.createContact(data).then( data => {
    if(data) res.send({message:'sucess!!'})
  })
 console.log('tst')
})

app.use( '/:action', (req,res) => {
  const action = req.params.action.toLocaleLowerCase();
  if(action === 'imoveis'){
    dbQueries.getImovel().then( data => {
      console.log('get imoveis: ', data.rows)
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

//general route
app.use('/:action/:id', (req, res) => {
  (async () => {
    try{
      const action = req.params.action.toLocaleLowerCase();
      const id = req.params.id;
      
      console.log('oi')
      
    }catch(err){
      console.log(err)
      res.send({
       error: err
      });
    }
  })()
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})