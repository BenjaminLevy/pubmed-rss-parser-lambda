import { Handler, Context} from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, BatchGetItemCommand, BatchGetItemInput, KeysAndAttributes, BatchGetItemCommandOutput, BatchGetItemCommandInput} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchGetCommand, BatchGetCommandInput, BatchGetCommandOutput } from "@aws-sdk/lib-dynamodb"; // ES6 import

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
  let rawData = '';
  res.on('data', (d) => {
    rawData += d;
  });
   res.on('end', () => {
      const rawServerChannelMap = event["serverIdToChannelMap"]["M"]
      const articlesArr = parseXML(rawData)
      const articlesToSkipMap = articleSeenBefore(articlesArr)
      const serverChannelMap = parseServerChannelMap(rawServerChannelMap)
      const retObj = {
        serverIdToChannelMap: serverChannelMap, 
        articles: articlesArr
      }
      callback(null, {
        "articlesToSkipMap": articlesToSkipMap,
        "retObj": retObj
      });
  });

}).on('error', (e) => {
  callback(e);
});

};

// this function is necessary to eliminate the cumbersome "AttributeValue"
// keys (i.e. types). 
// E.g. here's how "subscribers" looks before being parsed by this function:
// "31049823059721":{"S":"23023094823"},"3405920983094":{"S":"340235"}
// and after:
// "31049823059721":"23023094823","3405920983094":"340235"}
function parseServerChannelMap(rawSubscribers){
  for(const key in rawSubscribers){
   rawSubscribers[key] = rawSubscribers[key]["S"] 
  }
  return rawSubscribers
}

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

async function articleSeenBefore(articlesArr){

    let keys = articlesArr.map((item) => { 
      let sortKey = item.doi ? "doi#" + item.doi : "pmid#" + item.pmid
      return ({
        "resource-name": "pubmedArticle",
        "sort-key": sortKey
      })
    })

  const AWS_REGION: string = 'us-east-1'
  const baseClient = new DynamoDBClient({ region: AWS_REGION });
  const client = DynamoDBDocumentClient.from(baseClient); // client is DynamoDB client
  const TABLE_NAME: string = 'discordResources'

  const batchInputForDocClient: BatchGetCommandInput = {
    RequestItems: {
      [TABLE_NAME]: {
         Keys: keys,
        //Do you need these two? vvv
      ProjectionExpression: "#S, serverMap",
      ExpressionAttributeNames: {"#S": "sort-key"}
      }
    }
  }

  let testInput = new BatchGetCommand(batchInputForDocClient)
  let sortKeyToRSSArticleMap = {}
  const results = await client.send(testInput);
  let resWithoutMetadata = results.Responses[TABLE_NAME]
  return resWithoutMetadata
}

class Article{
  constructor(data){
    this.title = data.title
    this.description = data.description
    this.author = { name: this.getAuthorString(data['dc:creator']) }
    this.pmid = this.getId(data['dc:identifier'], "pmid")
    this.url = `https://pubmed.ncbi.nlm.nih.gov/${this.pmid}`
    // this.doi = this.getId(data['dc:identifier'], 'doi')
    // this.date = data['dc:date']
    // this.journal = data['dc:source']
  }
  getId(sourceArr, identifier){
    try{
      const fullId = sourceArr.find(a => a.startsWith(identifier))
      const idWithoutIdentifier = fullId.slice(identifier.length + 1)
      return idWithoutIdentifier
    } catch {
      return undefined
    }
  }
  getAuthorString(authorsArray){
    let authorsString
    try{
      if(authorsArray.length == 1){
       authorsString = authorsArray[0]
      }
      else if (authorsArray.length == 2){
       authorsString = `${authorsArray[0]} & ${authorsArray[1]}`
      }
      else authorsString = `${authorsArray[0]} et al.`
    }
    catch {
      authorsString = "unknown"
    }
    finally {
      return authorsString
    }
  }
}

