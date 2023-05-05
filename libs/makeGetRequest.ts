import * as https from 'https';

export async function makeGetRequest(url: string){ 
  return new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if(res.statusCode === 400){
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
    } else {
        reject(new Error(`Failed to fetch notices. Status code: ${res.statusCode}`))
    }
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
