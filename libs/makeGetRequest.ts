import * as https from 'https';

export async function makeGetRequest(event){ 
  return new Promise((resolve, reject) => {
  https.get(event['sort-key']["S"], (res) => {
      let rawData = '';
      res.on('data', (d) => {
        rawData += d;
      });
      res.on('end', () => {
          resolve(rawData)
          // const retobj = {
          //   serveridtochannelmap: serverchannelmap, 
          //   articles: articlesArr
          // }
          // callback(null, {
          //   "articlesToSkipMap": articlesToSkipMap,
          //   "retObj": retObj
          // });
      });
    })
    .on('error', (e) => {
      reject(e)
  });
  // const rawServerChannelMap = event["serverIdToChannelMap"]["M"]
  // const serverChannelMap = parseServerChannelMap(rawServerChannelMap)
  // const articlesArr = parseXML(rawData)
  // const  articlesSeenInDB = articleSeenBefore(articlesArr)
  // await enqueAndRecordArticleInDB(articlesarr, articlesseenindb, serverchannelmap)
});
}
let eventJson = {
"sort-key": { "S": "reddit.com"}
}
makeGetRequest(eventJson)
.then(result => console.log(result))
.catch(error => console.log("yeet", error.name))
