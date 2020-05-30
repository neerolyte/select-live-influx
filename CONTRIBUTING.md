# Contributing

<!-- TOC -->

- [Contributing](#contributing)
- [Local Docker Development](#local-docker-development)
	- [Starting Docker Containers](#starting-docker-containers)
	- [Creating Influx DB](#creating-influx-db)

<!-- /TOC -->

# Local Docker Development

## Starting Docker Containers

```
$ docker-compose up -d
```

## Creating Influx DB

```
$ docker-compose exec influxdb influx -execute "CREATE DATABASE energy"
```