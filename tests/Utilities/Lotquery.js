const mssql = require("mssql");
const getConnection = require("../Utilities/connectToDB");

async function getLotNumber(lotNumber, lotNumberAuto) {
  const connectionPool = await getConnection(); 
  try {
    const request = new mssql.Request(connectionPool);
    const lotNumberQuery = await request.query(
      `SELECT top 1 lot_sku as expectvalue from [GET].[dbo].[LOT] l where lot_status = 3 and SaleState='NSW' and BIDDING_CURR='9'and QTY='1' AND BidActionCount IS NULL  order by l.DATE_TIME_CRD desc`
    );
    const lotNumber = lotNumberQuery.recordset[0].expectvalue;

    console.log(lotNumber);

    return lotNumber;
  } finally {
    await connectionPool.close();
  }
}
async function getLotNumberAuto() {
  const connectionPool = await getConnection();
  try {
    const request = new mssql.Request(connectionPool);
    const lotNumberQuery = await request.query(
      `SELECT top 1 lot_sku as expectvalue from [GET].[dbo].[LOT] l where lot_status = 3 and SaleState='NSW' and BIDDING_CURR='10'and QTY='1' AND BidActionCount IS NULL  order by l.DATE_TIME_CRD desc`
    );
    const lotNumberAuto = lotNumberQuery.recordset[0].expectvalue;

    return lotNumberAuto;
  } finally {
    await connectionPool.close();
  }
}
async function getLotNumberAutoOutBid() {
  const connectionPool = await getConnection();
  try {
    const request = new mssql.Request(connectionPool);
    const lotNumberQuery = await request.query(
      `SELECT top 1 lot_sku as expectvalue from [GET].[dbo].[LOT] l where lot_status = 3 and SaleState='NSW' and BIDDING_CURR='15'and QTY='1' AND BidActionCount IS NULL  order by l.DATE_TIME_CRD desc`
    );
    const lotNumberAuto = lotNumberQuery.recordset[0].expectvalue;

    return lotNumberAuto;
  } finally {
    await connectionPool.close();
  }
}
module.exports = { getLotNumber, getLotNumberAuto, getLotNumberAutoOutBid };
