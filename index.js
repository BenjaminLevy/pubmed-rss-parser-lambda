const https = require('https');
const { XMLParser } = require("fast-xml-parser");
const { parse } = require('path');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, callback) => {
https.get(event['sort-key']["S"], (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  let rawData = '';
  res.on('data', (d) => {
    rawData += d;
  });
   res.on('end', () => {
      const articlesArr = parseXML(rawData)
      callback(null, articlesArr);
  });

}).on('error', (e) => {
  callback(e);
});

};


function parseXML(data){
  const options = {
  //preserveOrder:true,
  ignoreAttributes:true,
  ignoreDeclaration:true,
  ignorePiTags:true,
  }
  const parser = new XMLParser(options)
  let resArr = []
  const fullParsedData = parser.parse(data)
  //return fullParsedData[0].rss[0]
  const rawArticlesArr = fullParsedData.rss.channel.item
  rawArticlesArr.forEach((a) => resArr.push(new Article(a)))
  return resArr
  
}

class Article{
  constructor(data){
    this.title = data.title
    this.url = data.link
    this.description = data.description
    this.pmid = this.getId(data['dc:identifier'], "pmid")
    this.doi = this.getId(data['dc:identifier'], 'doi')
    this.date = data['dc:date']
    this.journal = data['dc:source']
    this.authorsArr = data['dc:creator']
  }
  getId(sourceArr, identifier){
      const fullId = sourceArr.find(a => a.startsWith(identifier))
      const idWithoutIdentifier = fullId.slice(identifier.length + 1)
      return idWithoutIdentifier
  }
}

