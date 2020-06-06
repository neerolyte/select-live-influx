require("dotenv").config();
const logger = require('pino')({
  level: process.env.LOG_LEVEL || 'info',
})
logger.info('Starting up')

const http = require('http');
const Influx = require('influx');
const Host = require('./lib/SelectLive').Host;
const host = new Host({
  "host": process.env.SELECT_LIVE_HOST,
  "bent": require('bent'),
})
const influx = new Influx.InfluxDB({
 host: process.env.INFLUX_HOST,
 database: process.env.INFLUX_DB,
 schema: [
   {
     measurement: 'point',
     fields: {
      battery_in_wh_today: Influx.FieldType.FLOAT,
      battery_in_wh_total: Influx.FieldType.FLOAT,
      battery_out_wh_today: Influx.FieldType.FLOAT,
      battery_out_wh_total: Influx.FieldType.FLOAT,
      battery_soc: Influx.FieldType.FLOAT,
      battery_w: Influx.FieldType.FLOAT,
      fault_code: Influx.FieldType.FLOAT,
      fault_ts: Influx.FieldType.FLOAT,
      gen_status: Influx.FieldType.FLOAT,
      grid_in_wh_today: Influx.FieldType.FLOAT,
      grid_in_wh_total: Influx.FieldType.FLOAT,
      grid_out_wh_today: Influx.FieldType.FLOAT,
      grid_out_wh_total: Influx.FieldType.FLOAT,
      grid_w: Influx.FieldType.FLOAT,
      load_w: Influx.FieldType.FLOAT,
      load_wh_today: Influx.FieldType.FLOAT,
      load_wh_total: Influx.FieldType.FLOAT,
      shunt_w: Influx.FieldType.FLOAT,
      solar_wh_today: Influx.FieldType.FLOAT,
      solar_wh_total: Influx.FieldType.FLOAT,
      solarinverter_w: Influx.FieldType.FLOAT
     },
     tags: []
   }
 ]
})

function writePoint(data) {
  logger.debug(`Writing ${JSON.stringify(data,)}`)
  influx.writePoints([
    {
      measurement: 'point',
      tags: {},
      fields: data.items,
      timestamp: data.timestamp,
    }
  ]).then(() => {
    logger.info("Wrote points!")
  })
};

host.getDevice().then((device) => {
  setInterval(() => {
    device.getPoint().then((data) => {
      writePoint(data);
    })
  }, 2000)
})