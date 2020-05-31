# Select.Live Influx

A utility to read performance data from a Select.Live device and send to InfluxDB.

The end goal is to render performance data in Grafana, but the storage in InfluxDB is not specific to Grafana so may be useful in other cases.

The easiest way to have Grafana render the data appears to be to store it in [InfluxDB](https://www.influxdata.com/) and the easiest way to capture data from a SP Pro is to query the [Select.Live](http://www.selectronic.com.au/monitoring/) device if one is already in place - so that's what this code does.

<!-- TOC -->

- [Select.Live Influx](#selectlive-influx)
- [Grafana Example](#grafana-example)
- [Getting Started](#getting-started)
- [Alternatives](#alternatives)

<!-- /TOC -->

# Grafana Example

![Grafana Example Screen Shot](images/example-grafana.png)

# Getting Started

This will get the code up and running in Docker with a containerised Grafana and InfluxDB installation. It's unlikely to be the best way to run it long term, but for now it's all you get.

Start Docker containers:

```
$ docker-compose up -d
Creating select-live-influx_node_1     ... done
Creating select-live-influx_influxdb_1 ... done
Creating select-live-influx_grafana_1  ... done
```



Navigate to <http://localhost:3000/login> and login as `admin/admin`.



# Alternatives

 * <https://github.com/angus-g/splink-influx> - Export SP Pro data via serial over ethernet to InfluxDB
 * <https://github.com/neerolyte/selpi> - Direct SP Pro serial connection (no export, yet)