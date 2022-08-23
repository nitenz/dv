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
      jwt = require('jsonwebtoken'),
      credentials = {
        user: 'postgres',
        host: 'host.docker.internal',
        database: 'imobiliaria',
        password: 'postgrespw',
        port: 49153,
      };


require('dotenv').config();

const jsonParser = bodyParser.json()
const client = new Client(credentials);

const saveImoveisImages = (imovelPath, imovel ) => {
 
  return new Promise((resolve, reject) => {
    let tempFiles = [];

    fs.readdir( path.join(__dirname, imovelPath ), (err, files) => {
      if(files.length>0){
        files.map( (img,idx) => {
          tempFiles.push( {src: 'http://localhost:8080/imoveis/'+imovel.id+'/'+img, title: img.split('.')[0]} )
  
          if(idx === files.length-1){
            imovel.img=tempFiles;
            resolve(imovel)
          }
        })
      }else{
        resolve(imovel)
      }
    });
  })
}

const createImovelData = (imoveis) => {
  let imoveisList = [];
  const nElements = imoveis.length;

  return new Promise((resolve, reject) => {
    imoveis.map(item => {
      const imovelPath = 'public/imoveis/'+item.id;

      saveImoveisImages(imovelPath, item).then(imovel => {
        imoveisList.push(imovel);
       
        if(imoveisList.length === nElements){
          resolve(imoveisList)
        }
      });
    })
  })
}

app.use(cors())
db.initializeDataTable();

//turn public imoveis folter
app.use('/imoveis', express.static('public/imoveis'))

app.post('/authenticate', jsonParser, (req,res) => {
  const data = req.body;

  dbQueries.getUserByFieldAndValue('username', data.username).then( (user) => {
    const userData = user.rows[0];
  
    if(userData.password === data.password){
      const token = jwt.sign(
        {
          data: {
            username: userData.username, 
            id: userData.id, 
            email: userData.email,
            role: 'admin'
          } 
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).send({token});
    }else{
      res.status(401).send({message:'Invalid password'})
    }
  })
});

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
      if(idx === imageFiles.length-1) res.send({msg: 'Images uploaded!'})
  })
});

/****************************** IMOVEIS CRUD  ***********************************/
app.get('/imoveis/', (req,res) => {
  dbQueries.getImovel().then( imoveisList => { 
    createImovelData(imoveisList.rows).then( imoveisListWithImages =>{
      res.send({data:imoveisListWithImages, total: imoveisListWithImages.length})
    });
  })
});

app.get('/imoveis/:id', (req,res) => {
  const id = req.params.id;

  dbQueries.getImovel(id).then( data => {
    createImovelData(data.rows).then( imoveis =>{
      res.send({data:imoveis[0]})
    });
  })
});

app.post('/imoveis', jsonParser, function (req, res) {
  const data = req.body;

  dbQueries.createImovel(data).then( imovel => {
    const imovelPath = 'public/imoveis/'+imovel.rows[0].id,
          dir = path.join(__dirname, imovelPath ),
          id = imovel.rows[0].id;

    fs.mkdirSync(dir);

    if(data.files){
      data.files.map((img, idx) => {
        const target_path = 'public/imoveis/' + id + '/' + img.title;
        
        fs.writeFile(target_path, img.src, err => {
          if (err) {
            console.error(err);
          }
        });
        if(idx === data.files.length-1) res.send({data:{id}})
    })
    }else{
      res.send({data:{id}})
    }
  })
})

app.delete('/imoveis/', jsonParser, function (req, res) {
  const data = req.body.id;
  let limit = data.length;

  if(Array.isArray(data) ){
    data.map( (id, idx) => {
      const imovelPath = 'public/imoveis/'+id;

      dbQueries.deleteImovel(id).then( data => {
        try {
            fs.rmdirSync(imovelPath, { recursive: true });
        
            console.log(`${imovelPath} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${imovelPath}.`);
        }
      })
      if(idx === limit){
        res.status(200).send(  {data: {msg: 'Imovel deleted '+ data} });
      }
    })
  }else{
    dbQueries.deleteImovel(data).then( resp => {
      const imovelPath = 'public/imoveis/'+data;
        try {
          fs.rm(imovelPath, { recursive: true }, () => {
            res.status(200).send(  {data: {msg: 'Imovel deleted '+ resp.rows[0]} });
          })
          console.log(`${imovelPath} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${dir}.`);
        }
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
  
  dbQueries.getUserByFieldAndValue( 'email', data.email).then( userDataEmail => {
    if(userDataEmail.rowCount === 0){
      dbQueries.getUserByFieldAndValue( 'username', data.username).then(userDataUsername => {
        if(userDataUsername.rowCount === 0){
          dbQueries.createUser(data).then( user => {
            res.send({id: user.rows[0].id});
          })
        }else{
          res.send({message: 'Username already exists in the database!'});  
        }
      })
    }else{
      res.send({message: 'Email already exists in the database!'});  
    }
  })
})

app.put('/users/:id', jsonParser, function (req, res) {
  const data = req.body;
  const id = req.params.id;
    
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