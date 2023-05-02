import { Handler, Context} from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, BatchGetItemCommand, BatchGetItemInput, KeysAndAttributes, BatchGetItemCommandOutput, BatchGetItemCommandInput} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchGetCommand, BatchGetCommandInput, BatchGetCommandOutput, Query } from "@aws-sdk/lib-dynamodb"; // ES6 import
import { articleSeenBefore } from './libs/articleSeenBefore'
import { SQS, SendMessageBatchCommand, SendMessageCommand, SendMessageBatchCommandInput } from "@aws-sdk/client-sqs"
const https = require('https');
const { XMLParser } = require('fast-xml-parser');
const { parse } = require('path');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event, context, callback) => {
https.get(event['sort-key']["S"], (res) => {
  let rawData = '';
  res.on('data', (d) => {
    rawData += d;
  });
   res.on('end', () => {
      return const articlesArr = parseXML(rawData)
      const rawServerChannelMap = event["serverIdToChannelMap"]["M"]
      const serverChannelMap = parseServerChannelMap(rawServerChannelMap)
      const articlesArr = parseXML(rawData)
      const  articlesSeenInDB = articleSeenBefore(articlesArr)
      await enqueAndRecordArticleInDB(articlesarr, articlesseenindb, serverchannelmap)
      // const retObj = {
      //   serverIdToChannelMap: serverChannelMap, 
      //   articles: articlesArr
      // }
      // callback(null, {
      //   "articlesToSkipMap": articlesToSkipMap,
      //   "retObj": retObj
      // });
  });

}).on('error', (e) => {
  callback(e);
});

};

const client = new SQSClient(config);

const QUEUE_URL =  

const input = { // SendMessageRequest
  QueueUrl: QUEUE_URL // required
  MessageBody: "STRING_VALUE", // required
  DelaySeconds: Number("int"),
  MessageAttributes: { // MessageBodyAttributeMap
    "<keys>": { // MessageAttributeValue
      StringValue: "STRING_VALUE",
      BinaryValue: "BLOB_VALUE",
      DataType: "STRING_VALUE", // required
    },
  },
  MessageSystemAttributes: { // MessageBodySystemAttributeMap
      DataType: "STRING_VALUE", // required
    },
  },
};
const command = new SendMessageCommand(input);
const response = await client.send(command);
function enqueAndRecordArticleInDB(articlesArr, articlesSeenInDB, serverChannelMap){
  return Promise.resolve("hello")
    const unqueuedArticlesArr = articlesArr.filter((article: Article) => {
        return articlesSeenInDB[article.id] != true
      })

    const length = unqueuedArticlesArr.length
    let i: number = 0
    while(i < length){
      let j = i + 9
      let slice = unqueuedArticlesArr.slice(i,j)
      let sendMessageString = ""
      slice.forEach((item: Article) => { sendMessageString += item })
      
      i = j
    } 
}
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

function parseXML(data): Article[]{
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
    readonly title: string;
    readonly description: string;
    readonly author: any;
    readonly pmid: string;
    readonly url: string;
    readonly doi: string;
    readonly id: string;

  constructor(data){
    this.title = data.title
    this.description = data.description
    this.author = { name: this.getAuthorString(data['dc:creator']) }
    this.pmid = this.getId(data['dc:identifier'], "pmid")
    this.url = `https://pubmed.ncbi.nlm.nih.gov/${this.pmid}`
    this.doi = this.getId(data['dc:identifier'], 'doi')
    this.id = this.doi? this.doi : this.pmid
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
  getAuthorString(authorsArray): string{
    let authorsString: string
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

