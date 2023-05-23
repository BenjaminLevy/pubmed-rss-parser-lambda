import { Handler, Context} from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, BatchGetItemCommand, BatchGetItemInput, KeysAndAttributes, BatchGetItemCommandOutput, BatchGetItemCommandInput} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchGetCommand, BatchGetCommandInput, BatchGetCommandOutput, Query } from "@aws-sdk/lib-dynamodb"; // ES6 import
import { SQS, SendMessageBatchCommand, SendMessageCommand, SendMessageBatchCommandInput } from "@aws-sdk/client-sqs"
import { ClientRequest } from 'http';
import { articleSeenBefore } from './libs/articleSeenBefore'
import { makeGetRequest } from './libs/makeGetRequest'
import { Article } from './libs/article'
import { enqueArticles } from './libs/enqueArticles'
const https = require('https');
const { XMLParser } = require('fast-xml-parser');
const { parse } = require('path');

exports.handler = async (event, context, callback) => {
  const rawServerChannelMap = event["serverIdToChannelMap"]["M"]
  const serverChannelMap = parseServerChannelMap(rawServerChannelMap)

  const url = event['sort-key']["S"]
  const httpResponse = await makeGetRequest(url)
  const articlesArr: Article[] = parseXML(httpResponse)
  const articlesSeenBeforeMap = await articleSeenBefore(articlesArr)
  // filter out the articles which have been seen before
  const unqueuedArticlesArr = articlesArr.filter((article: Article) => {
        return articlesSeenBeforeMap[article.sortKey] != true
      })
  const discordEmbedsArr = [] 
  unqueuedArticlesArr.forEach((article) => {
    discordEmbedsArr.push(article.toEmbed())
  })
  const enqueRes = await enqueArticles(discordEmbedsArr, serverChannelMap)
  return enqueRes
}

// async function enqueArticles(articlesArr, serverChannelMap){
//   return new Promise((resolve, reject) => {
//     const length = articlesArr.length
//     let i: number = 0
//     while(i < length){
//       let j = i + 9
//       let slice = articlesArr.slice(i,j)
//       let sendMessageString = ""
//       slice.forEach((item: Article) => { sendMessageString += item })
//       console.log(slice)  
//       i = j
//     } 
//     resolve("complete")
//   })
// }

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
  rawArticlesArr.forEach((a) => {
    let article = new Article(a)
    if(article.sortKey !== undefined){
      resArr.push(article)
    }
  })
  return resArr
  
}


