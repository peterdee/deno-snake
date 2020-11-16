## deno-snake

A backend for the [JS Snake](https://github.com/peterdee/js-snake) project.

Stack: [Deno](https://deno.land), [Oak](https://github.com/oakserver/oak), [Mongo](https://www.mongodb.com)

DEV: http://localhost:7111

STAGE: https://deno-snake.herokuapp.com

Frontend endpoint: https://js-snake-jquery.herokuapp.com

### Deploy

`Deno` v1.5.2 was used during the development.

```shell script
git clone https://github.com/peterdee/deno-snake
cd ./deno-snake
```

### Environment

The `.env` file is required. See the [.env.example](.env.example) file for details. 

### Launch

```shell script
bash run.sh
```

### Heroku

Application is deployed to Heroku manually via the Heroku CLI

See [this](https://github.com/chibat/heroku-deno-getting-started) for details regarding the Heroku Buildpack
