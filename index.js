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
    // let fullXML = parser.parse(data)
   // let content = jObj.rss.channel.item[1]["content:encoded"]
    let jContent = parser.parse(data)
    //console.log(jContent.rss.channel.item)
    const portionOfXMLWithAbstract = jContent.rss.channel.item[0].description
    console.log(portionOfXMLWithAbstract)
    console.log(portionOfXMLWithAbstract[portionOfXMLWithAbstract.length - 1]["#text"])

    const singleArticle = jContent.rss.channel.item[0]
    let article = new Article(singleArticle)
    //function getId(sourceArr, identifier){
      //fullId = sourceArr.find(a => a.startsWith(identifier))
      //idWithoutIdentifier = fullId.slice(identifier.length + 1)
      //return idWithoutIdentifier
    //}
    //console.log(getId(singleArticle['dc:identifier'], 'doi'))
    console.log(article)
  }
})

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
//let jObj = parser.parse(XMLdata)
