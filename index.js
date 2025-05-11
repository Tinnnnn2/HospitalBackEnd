const express = require('express');
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();


app.use(session({
  store: new SQLiteStore({
    db: 'sessions.sqlite',
    dir: './Database'
  }),
  secret: 'mySuperSecretKey',
   resave: true,       // ✔ ต่ออายุ session ทุก request
  saveUninitialized: false,
  rolling: true,      // ✔ ต่ออายุ cookie ทุก request
  cookie: { maxAge: 15 * 60 * 1000 } // หมดอายุถ้าไม่มีการใช้งาน 15 นาที
}));


app.use(express.json());

const sequelize = new Sequelize('database','username','password',{
host: 'localhost',
dialect: 'sqlite',
storage: './Database/DB.sqlite'
});

const Products = sequelize.define('Product', {
Productid:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
size:{
    type: Sequelize.INTEGER,
    allowNull: false
},
price:{
    type: Sequelize.FLOAT,
    allowNull: false
},
Typeid:{
    type: Sequelize.INTEGER,
    allowNull: false
},
Name_product:{
    type: Sequelize.INTEGER,
    allowNull: false
},
img_product:{
    type: Sequelize.STRING,
    allowNull: false
}
});



const Types = sequelize.define('Type', {
Typeid:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
TypeName:{
    type: Sequelize.STRING,
    allowNull: false
}
});




const user = sequelize.define('users',{
userid:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
username:{
    type: Sequelize.STRING,
    allowNull: false
},
email:{
    type: Sequelize.STRING,
    allowNull: false
},
password:{
    type: Sequelize.STRING,
    allowNull: false
},
phone:{     
    type: Sequelize.STRING,
    allowNull: false
},
userAdress:{
    type: Sequelize.STRING,
    allowNull: false
},
level:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "user" 
}
});

const orders = sequelize.define('order', {

orderid:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
userid:{
    type: Sequelize.INTEGER,
    allowNull: false
},
Productid:{
    type: Sequelize.INTEGER,
    allowNull: false
}
});

orders.belongsTo(user, { foreignKey: 'userid' });
orders.belongsTo(Products, { foreignKey: 'Productid' });



sequelize.sync();

app.get('/Products',(req, res) =>{
Products.findAll().then(Products => {
    res.json(Products);
}).catch(err => {
    res.status(500).send(err);
});
});

app.get('/Products/:id',(req, res) =>{
Products.findByPk(req.params.id).then(Products => {
    if (!Products){
        res.status(404).send('Product not found');
    } else{
        res.json(Products);
    }
}).catch(err => {
    res.status(500).send(err);
});
});
    
app.post('/Products',(req, res) =>{
Products.create(req.body).then(Products => {
    res.send(Products);
}).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/Products/:id',(req,res) => {
Products.findByPk(req.params.id).then(Products => {
    if (!Products) {
        res.status(404).send('Products not found');
    } else {
        Products.update(req.body).then(() =>{
            res.send(Products);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}).catch(err => {   
    res.status(500).send(err);
});
});

app.delete('/Products/:id',(req,res) => {
Products.findByPk(req.params.id).then(Products => {
    if (!Products){
        res.status(404).send('Products not found');
    } else {
        Products.destroy().then(() => {
            res.send({});
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}).catch(err => {
    res.status(500).send(err);
});
});

//----------------------------------Types-------------------------------

app.get('/Types',(req, res) =>{
    Types.findAll().then(Types => {
    res.json(Types);
}).catch(err => {
    res.status(500).send(err);
});
});

app.get('/Types/:id',(req, res) =>{
    Types.findByPk(req.params.id).then(Types => {
    if (!Types){
        res.status(404).send('Types not found');
    } else{
        res.json(Types);
    }
}).catch(err => {
    res.status(500).send(err);
});
});

app.get('/Types',(req, res) =>{
    Types.findByPk(req.params.id).then(Types => {
    if (!Types){
        res.status(404).send('Types not found');
    } else{
        res.json(Types);
    }
}).catch(err => {
    res.status(500).send(err);
});
});

app.post('/Types',(req, res) =>{
    Types.create(req.body).then(Types => {
    res.send(Types);
}).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/Types/:id',(req,res) => {
    Types.findByPk(req.params.id).then(Types => {
    if (!Types) {
        res.status(404).send('Types not found');
    } else {
        Types.update(req.body).then(() =>{
            res.send(Types);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}).catch(err => {
    res.status(500).send(err);
});
});

app.delete('/Types/:id',(req,res) => {
    Types.findByPk(req.params.id).then(Types => {
    if (!Types){
        res.status(404).send('Types not found');
    } else {
        Types.destroy().then(() => {
            res.send({});
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}).catch(err => {
    res.status(500).send(err);
});
});

app.get('/Products',(req, res) =>{
    Products.findAll().then(Products => {
        res.json(Products);
    }).catch(err => {
        res.status(500).send(err);
    });
    });

// -----------------------*users*--------------------------------------------------
app.get('/users',(req, res) =>{
user.findAll().then(user => {
    res.json(user);
}).catch(err => {
    res.status(500).send(err);
});
});

app.get('/users/:id',(req, res) =>{
user.findByPk(req.params.id).then(user => {
    if (!user){
        res.status(404).send('user not found');
    } else{
        res.json(user);
    }
}).catch(err => {
    res.status(500).send(err);
});
});

app.post('/users',(req, res) =>{
user.create(req.body).then(user => {
    res.send(user);
}).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/users/:id',(req,res) => {
user.findByPk(req.params.id).then(user => {
    if (!user) {
        res.status(404).send('user not found');
    } else {
        user.update(req.body).then(() =>{
            res.send(user);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}).catch(err => {
    res.status(500).send(err);
});
});

app.delete('/users/:id',(req,res) => {
user.findByPk(req.params.id).then(user => {
    if (!user){
        res.status(404).send('user not found');
    } else {
        orders.destroy({where:{userid:req.params.id},})
        user.destroy().then(() => {
            res.send({});
        }).catch(err => {
            res.status(500).send(err);
        });
    }   
}).catch(err => {
    res.status(500).send(err);
});
});




// -----------------------*  *--------------------------------------------------


app.post('/login',async(req, res) =>{
    try {
        const {name,password} = req.body
        console.log(req.body)
        const checkN = await user.findOne({where:{username:name}})
        if(!checkN){
            return res.json({message:"user not found"})
        }
        if(checkN.password != password){
            return res.json({message:"wrong password"})
        }
        
        return res.json({message: true,checkN})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server_error" });

}});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Logout error:', err);
            return res.redirect('/');
        }
        res.redirect('/login'); // 👉 กลับไปหน้า login
    });
});




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));  