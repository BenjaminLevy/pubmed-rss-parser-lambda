import { SQS, SQSClient, SendMessageBatchCommand, SendMessageCommand, SendMessageBatchCommandInput } from "@aws-sdk/client-sqs"

const queueUrl = "https://sqs.us-east-1.amazonaws.com/962596043005/pubmedRSSQueue"
const sqsClient = new SQSClient({region: 'us-east-1'});

export async function enqueArticles(articlesArr, serverChannelMap){
  try{
    const length = articlesArr.length
    let i: number = 0
    let res
    while(i < length){
      let j = i + 10
      let slice = articlesArr.slice(i,j)
      let sendMessageArray = []
      slice.forEach((item: any) => { sendMessageArray.push(item) })
      for(let server in serverChannelMap){
        let messageObjectWithServerAndChannel = {
            embeds: sendMessageArray,
            server: server,
            channel: serverChannelMap[server]
          }
        res = await sqsClient.send(
          new SendMessageCommand({
            MessageBody: JSON.stringify(messageObjectWithServerAndChannel),
            QueueUrl: queueUrl,
            MessageAttributes:{ // MessageBodyAttributeMap
              "server": { // MessageAttributeValue
                StringValue: server,
                DataType: "String", // required
              },
              "channel": { // MessageAttributeValue
                StringValue: serverChannelMap[server],
                DataType: "String", // required
              }
            }
          })
        )
      }
      i = j
    }

      if (res.$metadata.httpStatusCode) {
        if (res.$metadata.httpStatusCode > 299) {
          throw new Error(`Failed to send sqs message metadata:${res.$metadata}`);
        }
      }
    return "success"
  }
  catch(e){
    throw e
  }
}

//
// const QUEUE_URL = https://sqs.us-east-1.amazonaws.com/962596043005/pubmedRSSQueue

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
//
