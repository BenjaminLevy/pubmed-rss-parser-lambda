const { XMLParser } = require("fast-xml-parser")
const fs = require("fs")
options = {
  preserveOrder:true,
  ignoreAttributes:true,
  ignoreDeclaration:true,
  ignorePiTags:true,
}
const parser = new XMLParser()
fs.readFile("./pubmed-api-response-limit-50.txt", "utf8", function(err, data){
   if(err){
    console.log(err)
  }else{
    let jObj = parser.parse(data)
    let content = jObj.rss.channel.item[1]["content:encoded"]
    let jContent = parser.parse(content)
    const portionOfXMLWithAbstract = jContent.div.p
    console.log(portionOfXMLWithAbstract[portionOfXMLWithAbstract.length - 1]["#text"])

  }
})
//let jObj = parser.parse(XMLdata)
