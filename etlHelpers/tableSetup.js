const { Client } = require('pg');

const client = new Client({
  // user: 'username',
  // password: 'password',
  host: '127.0.0.1',
  port: 5432,
  database: 'mydb',
});

client.connect()
  .then(()=>{
    client.query('DROP TABLE IF EXISTS cart')
      .then(()=>console.log('Cart Table Dropped'))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS feature_product_join_table')
      .then(()=>console.log('Product Join Table Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS features')
      .then(()=>console.log('Fetaures Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS related')
      .then(()=>console.log('Related Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS skus')
      .then(()=>console.log('Skus Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS photos')
      .then(()=>console.log('Photos Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS styles')
      .then(()=>console.log('Styles Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('DROP TABLE IF EXISTS product')
      .then(()=>console.log('Product Table Dropped'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE product (id INT PRIMARY KEY, name TEXT, slogan TEXT, description TEXT, category TEXT, default_price INT)')
    .then(()=>console.log('Product Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE features (id INT PRIMARY KEY, product_id INT, feature TEXT, value TEXT, FOREIGN KEY (product_id) REFERENCES product(id))')
    .then(()=>console.log('Features Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE feature_product_join_table (product_id INT, features_id INT, FOREIGN KEY (product_id) references product(id), FOREIGN KEY (features_id) REFERENCES features(id))')
    .then(()=>console.log('Product Join Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE styles (id INT PRIMARY KEY, productId INT, name TEXT, sale_price INT, original_price INT, default_style INT, FOREIGN KEY (productId) REFERENCES product(id))')
    .then(()=>console.log('Styles Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE skus (id INT PRIMARY KEY, styleId INT, size TEXT, quantity INT,  FOREIGN KEY (styleId) REFERENCES styles(id))')
    .then(()=>console.log('Skus Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE related (id INT PRIMARY KEY, current_product_id INT, related_product_id INT)')
    .then(()=>console.log('Related Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=> {
    client.query('CREATE TABLE photos (id INT PRIMARY KEY, styleId INT, url TEXT, thumbnail_url TEXT, FOREIGN KEY (styleId) REFERENCES styles(id))')
    .then(()=>console.log('Photos Table Created'))
      .catch((error)=>console.log(error))
  })
  .then(()=>{
    client.query('CREATE TABLE cart (sku_id INT, count INT)')
    .then(()=>console.log('Cart Table Created'))
      .catch((error)=>console.log(error))
      .then(()=>client.end())
  })
  .catch((error)=>{
    console.log(error)
    client.end()
  })

