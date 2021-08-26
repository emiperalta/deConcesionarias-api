# deConcesionarias Web API

### To use locally:

1 - Clone de project

```javascript
git clone https://github.com/emiperalta/deConcesionarias-api
```

2 - Create an .env file inside the cloned proyect with the following variables (replace them with your values):

```javascript
DB_USERNAME = <DB_USERNAME>
DB_PASSWORD = <DB_PASSWORD>
DB_DATABASE = <DB_DATABASE>
DB_HOST = <DB_HOST>
PORT = <PORT_NUMBER>
```

3 - Install dependencies:

```javascript
cd deconcesionarias-api
npm install
```

4 - Run database seeds:

```javascript
npx sequelize-cli db:seed:all
```

5 - Run server in dev mode:

```javascript
npm run dev
```

6 - Make requests to:

```javascript
http://localhost:{YOUR_PORT}/api/vehicles (GET, POST, PUT, DELETE)
http://localhost:{YOUR_PORT}/api/vehicle-properties (GET, POST, PUT, DELETE)
http://localhost:{YOUR_PORT}/api/categories (GET)
```
