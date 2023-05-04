import { Handler, Context} from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, BatchGetItemCommand, BatchGetItemInput, KeysAndAttributes, BatchGetItemCommandOutput, BatchGetItemCommandInput} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchGetCommand, BatchGetCommandInput, BatchGetCommandOutput, Query } from "@aws-sdk/lib-dynamodb"; // ES6 import
import { SQS, SendMessageBatchCommand, SendMessageCommand, SendMessageBatchCommandInput } from "@aws-sdk/client-sqs"
import { ClientRequest } from 'http';
import { articleSeenBefore } from './libs/articleSeenBefore'
import { makeGetRequest } from './libs/makeGetRequest'
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
  
makeGetRequest(event)
function getArticlesArr(): Promise<Notice[]> {
    const timeout = 10000;
    return new Promise((resolve, reject) => {
      let req: ClientRequest | undefined;

      let timer = setTimeout(() => {
        if (req) {
          req.destroy(new Error('Request timed out'));
        }
      }, timeout);

      timer.unref();

      try {
        req = https.get('https://cli.cdk.dev-tools.aws.dev/notices.json',
          res => {
            if (res.statusCode === 200) {
              res.setEncoding('utf8');
              let rawData = '';
              res.on('data', (chunk) => {
                rawData += chunk;
              });
              res.on('end', () => {
                try {
                  const data = JSON.parse(rawData).notices as Notice[];
                  if (!data) {
                    throw new Error("'notices' key is missing");
                  }
                  debug('Notices refreshed');
                  resolve(data ?? []);
                } catch (e: any) {
                  reject(new Error(`Failed to parse notices: ${e.message}`));
                }
              });
              res.on('error', e => {
                reject(new Error(`Failed to fetch notices: ${e.message}`));
              });
            } else {
              reject(new Error(`Failed to fetch notices. Status code: ${res.statusCode}`));
            }
          });
        req.on('error', reject);
      } catch (e: any) {
        reject(new Error(`HTTPS 'get' call threw an error: ${e.message}`));
      }
    });
  }
}
// const client = new SQSClient(config);
//
// const QUEUE_URL = 

// const input = { // SendMessageRequest
//   QueueUrl: QUEUE_URL // required
//   MessageBody: "STRING_VALUE", // required
//   DelaySeconds: Number("int"),
//   MessageAttributes: { // MessageBodyAttributeMap
//     "<keys>": { // MessageAttributeValue
//       StringValue: "STRING_VALUE",
//       BinaryValue: "BLOB_VALUE",
//       DataType: "STRING_VALUE", // required
//     },
//   },
//   MessageSystemAttributes: { // MessageBodySystemAttributeMap
//       DataType: "STRING_VALUE", // required
//     },
//   },
// };
// const command = new SendMessageCommand(input);
// const response = await client.send(command);
// 
//
//
// uncomment after test ^^^
function enqueAndRecordArticleInDB(articlesArr, articlesSeenInDB, serverChannelMap){
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

