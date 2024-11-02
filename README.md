## startup
run cp .env.sample .env
run docker-compose up
change PG_HOST in .env to 0.0.0.0
install knex & run migrations with knex migrate:up 
postgres is running on 5432 so make sure you've stopped other instances
in order to use swagger, set NODE_ENV to "dev", swagger is available on /docs

login: user
password: password

## routes
### /items/purchase 
accepts uriEncoded market_hash_name as path param