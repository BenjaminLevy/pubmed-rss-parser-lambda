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

exports.handler = async (event, context, callback) => {
  const url = event['sort-key']["S"]
  const httpResponse = await makeGetRequest(url)
  const articlesArr = parseXML(httpResponse)
  const rawServerChannelMap = event["serverIdToChannelMap"]["M"]
  const serverChannelMap = parseServerChannelMap(rawServerChannelMap)
  const articlesSeenBeforeMap = await articleSeenBefore(articlesArr)
  // filter out the articles which have been seen before
  const unqueuedArticlesArr = articlesArr.filter((article: Article) => {
        return articlesSeenBeforeMap[article.sortKey] != true
      })
  await enqueArticles(articlesArr, serverChannelMap)
}

async function enqueArticles(articlesArr, serverChannelMap){
  return new Promise((resolve, reject) => {
    const length = articlesArr.length
    let i: number = 0
    while(i < length){
      let j = i + 9
      let slice = articlesArr.slice(i,j)
      let sendMessageString = ""
      slice.forEach((item: Article) => { sendMessageString += item })
      console.log(slice)  
      i = j
    } 
    resolve("complete")
  })
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
    readonly sortKey: string;

  constructor(data){
    this.title = data.title
    this.description = data.description
    this.author = { name: this.getAuthorString(data['dc:creator']) }
    this.pmid = this.getId(data['dc:identifier'], "pmid")
    this.url = `https://pubmed.ncbi.nlm.nih.gov/${this.pmid}`
    this.doi = this.getId(data['dc:identifier'], 'doi')
    this.sortKey = this.doi? this.doi : this.pmid
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
