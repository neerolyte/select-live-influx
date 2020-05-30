require("dotenv").config();
const http = require('http');
const Influx = require('influx');
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

/* Example response:
{
  device: { name: 'Selectronic SP-PRO' },
  item_count: 22,
  items: {
    battery_in_wh_today: 6.18310546875,
    battery_in_wh_total: 1010.06103515625,
    battery_out_wh_today: 3.59912109375,
    battery_out_wh_total: 976.5615234375,
    battery_soc: 96.05859375,
    battery_w: 296.08154296875,
    fault_code: 0,
    fault_ts: 0,
    gen_status: 0,
    grid_in_wh_today: 0,
    grid_in_wh_total: 1.87880859375,
    grid_out_wh_today: 0,
    grid_out_wh_total: 0,
    grid_w: 0,
    load_w: 236.6302490234375,
    load_wh_today: 8.625439453125,
    load_wh_total: 1921.1671875,
    shunt_w: 11.53564453125,
    solar_wh_today: 12.47666015625,
    solar_wh_total: 2396.128857421875,
    solarinverter_w: 0,
    timestamp: 1590829082
  },
  now: 1590829084
}
*/

function writePoint(data) {
  var fields = data.items;
  var timestamp = new Date(data.items.timestamp*1000);
  delete fields.timestamp;
  influx.writePoints([
    {
      measurement: 'point',
      tags: {},
      fields: fields,
      timestamp: timestamp,
    }
  ]).then(() => {
    console.log("Wrote points!\n")
  })
};

http.get(process.env.SELECT_LIVE_POINT_URL, (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // Consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      writePoint(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});