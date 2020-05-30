const os = require("os");
const Influx = require('influx');
const influx = new Influx.InfluxDB({
 host: 'influxdb',
 database: 'energy',
 schema: [
   {
     measurement: 'power',
     fields: {
      foo: Influx.FieldType.FLOAT
     },
     tags: []
   }
 ]
})

influx.writePoints([
  {
    measurement: 'power',
    tags: {},
    fields: { foo: Math.random() },
  }
]).then(() => {
  console.log("Wrote points!\n")
})