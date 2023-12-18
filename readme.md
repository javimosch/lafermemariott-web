

## Docker

### Compile

```sh
docker build -t javimosch/fermem-web:1 .
```

### Run

#### Docker run

```sh
docker run --rm -p 3000:3000 javimosch/fermem-web:1
```

#### Compose

```sh
docker-compose --profile prod up
```