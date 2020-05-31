# Select.Live Influx

A utility to read performance data from a Select.Live device and send to InfluxDB.

The end goal is to render performance data in Grafana, but the storage in InfluxDB is not specific to Grafana so may be useful in other cases.

The easiest way to have Grafana render the data appears to store it in [InfluxDB](https://www.influxdata.com/) and the easiest way to capture data from a SP Pro is to query the [Select.Live](http://www.selectronic.com.au/monitoring/) device if one is already in place - so that's what this code does.

<!-- TOC -->

- [Select.Live Influx](#selectlive-influx)
- [Grafana Example](#grafana-example)
- [Alternatives](#alternatives)

<!-- /TOC -->

# Grafana Example

![Grafana Example Screen Shot](images/example-grafana.png)

# Alternatives

 * <https://github.com/angus-g/splink-influx> - Export SP Pro data via serial over ethernet to InfluxDB
 * <https://github.com/neerolyte/selpi> - Direct SP Pro serial connection (no export, yet)