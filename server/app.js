const express = require('express'),
      { Client } = require('pg'),
      db = require( './config/db.js'),
      tableConfig = require('./config/table-config.js'),
      app = express(),
      port = 8080,
      cors = require('cors'),
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser'),
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

    fs.readdir(path.join(__dirname, imovelPath ), (err, files) => {
      if(files && files.length > 0){
        files.map( (img,idx) => {
          tempFiles.push( {src: 'http://localhost:8080/imoveis/'+imovel.id+'/'+img, title: img.split('.')[0]} )
  
          if(idx === files.length-1){
            imovel.img=tempFiles;
            imovel ? resolve(imovel) : reject();
          }
        })
      }else{
        imovel ? resolve(imovel) : reject();
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
          imoveisList.length > 0 ? resolve(imoveisList) : reject();
        }
      });
    })
  })
}

app.use(cors())
tableConfig.initializeDataTable();

//turn public imoveis folter
app.use('/imoveis', express.static('public/imoveis'))

app.post('/authenticate', jsonParser, (req,res) => {
  const data = req.body;

  db.getUserByFieldAndValue('username', data.username).then( (user) => {
    const userData = user.rows[0];
  
    console.log('user: ', userData)
    if(userData.password === data.password){
      db.getAdmin(userData.id).then(data => {
        let resp = data;
        
        const token = jwt.sign(
          {
            data: {
              username: userData.username, 
              id: userData.id, 
              email: userData.email,
              role: resp.admin_type === 2 ? 'super-admin' : resp.admin_type === 1 ? 'admin' : 'user'
            } 
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).send({token});
        
      }) 
     
    }else{
      res.status(401).send({message:'Invalid password'})
    }
  })
});

app.post('/add/images', upload.array('file'), function (req,res) {
  const imageFiles = req.files,
        id = req.body.id,
        title = req.body.title,
        target_path = 'public/imoveis/' + id + '/';
        
        fs.readdir(target_path, function(err, files) {
          
          if(files && files.length > 0) {
            fs.rmSync(target_path, { recursive: true })
          }
      
          imageFiles.map( (img, idx) => {
            const imgTitle = Array.isArray(title) ? title[idx] : title ? title : img.originalname;
            const filePath = target_path + imgTitle;
      
            if(!fs.existsSync(target_path)) fs.mkdirSync(target_path);

            fs.writeFile(filePath, img.buffer, err => {
              if (err) {
                console.error(err);
              }
            });
          
            if(idx === imageFiles.length-1) res.send({msg: 'Images uploaded!'})
          })
        })
});

/****************************** IMOVEIS CRUD  ***********************************/
app.get('/imoveis/', (req,res) => {
  db.getImovel().then( imoveisList => { 
    createImovelData(imoveisList.rows).then(imoveisListWithImages =>{
      res.send({data:imoveisListWithImages, total: imoveisListWithImages.length})
    });
  })
});

app.get('/imoveis/:id', (req,res) => {
  const id = req.params.id;

  db.getImovel(id).then(data => {
    createImovelData(data.rows).then(imoveis =>{
      res.send({data:imoveis[0]})
    });
  })
});

app.put('/imoveis/:id', jsonParser, (req, res) =>  {
  const data = req.body,
        id = req.params.id;

  db.updateImovel(data).then( data => {
    res.send({data:{id}});
  })
})

app.post('/imoveis', jsonParser, (req, res) =>  {
  const data = req.body;

  db.createImovel(data).then( imovel => {
    const imovelPath = 'public/imoveis/'+imovel.rows[0].id,
          dir = path.join(__dirname, imovelPath ),
          id = imovel.rows[0].id;

    fs.mkdirSync(dir);
  
    res.send({data:{id}});
  })
})

app.delete('/imoveis/', jsonParser, (req, res) =>  {
  const data = req.body.id;
  let limit = data.length-1;
  
  if(Array.isArray(data)){
    let deleteList = [];
    data.map((id, idx) => {
      const imovelPath = 'public/imoveis/'+id;
      
      db.deleteImovel(id).then( data => {
        try {
            fs.rmSync(imovelPath, { recursive: true })
            deleteList.push({id: data.rows[0].id})
            console.log(`${imovelPath} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${imovelPath}.`);
        }
      })
      if(idx === limit){
        res.status(200).send( {data:deleteList});
      }
    })
  }else{
    db.deleteImovel(data).then( resp => {
      const imovelPath = 'public/imoveis/'+data;
        try {
          fs.rmSync(imovelPath, { recursive: true }, () => {
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
  db.getUser().then( users => {
    res.send({data:users.rows, total: users.rowCount})
  })
});

app.get('/users/:id', (req,res) => {
  const id = req.params.id;
  
  db.getUser(id).then( users => {
    res.send({data:users.rows[0]})
  })
});

app.post('/users', jsonParser, (req, res) =>  {
  const data = req.body;
  
  db.getUserByFieldAndValue( 'email', data.email).then( userDataEmail => {
    if(userDataEmail.rowCount === 0){
      db.getUserByFieldAndValue( 'username', data.username).then(userDataUsername => {
        if(userDataUsername.rowCount === 0){
          db.createUser(data).then( user => {
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

app.put('/users/:id', jsonParser, (req, res) =>  {
  const data = req.body;
  const id = req.params.id;
    
  db.updateUser(data).then( user => {
    res.send({id: user.rows[0]});
  })
})

app.delete('/users/', jsonParser, (req, res) =>  {
  const data = req.body.id;
  let limit = data.length;
  
  if(Array.isArray(data) ){
    data.map( (id, idx) => {

      db.deleteUser(id);
      if(idx === limit){
        res.send( {msg: 'user deleted '+ data });
      }
    })
  }else{
    db.deleteUser(data).then( resp => {
      res.send( {msg: 'user deleted '+ resp.rows[0] });
    })
  }
})
/****************************** END USERS CRUD  ***********************************/

/****************************** CONTACTS CRUD  ***********************************/
app.get('/contacts/', (req,res) => {
  const id = req.params.id || '';
 
  db.getContact().then( contact => {
    res.send({data:contact.rows, total: contact.rowCount})
  })
});

app.post('/add/contact', jsonParser, (req, res) =>  {
  const data = req.body;

  db.createContact(data).then( data => {
    if(data) res.send({message:'sucess!!'})
  })
})

app.delete('/contacts/', jsonParser, (req, res) =>  {
  const data = req.body.id;
  let limit = data.length;
  
  if(Array.isArray(data) ){
    data.map( (id, idx) => {

      db.deleteContact(id);
      if(idx === limit){
        res.send( {msg: 'Imovel deleted '+ data });
      }
    })
  }else{
    db.deleteContact(data).then( resp => {
      res.send( {msg: 'Imovel deleted '+ resp.rows[0] });
    })
  }
})
/****************************** END CONTACTS CRUD  ***********************************/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})