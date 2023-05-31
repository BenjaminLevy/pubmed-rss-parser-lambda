export class Article{
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
    this.author = this.getAuthorString(data['dc:creator'])
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
    catch(e) {
      console.log(e)
      authorsString = "unknown"
    }
    finally {
      return authorsString
    }
  }

  // "slice" used here to prevent fields from surpassing character limit, 
  // which will cause the Discord API to reject the request. see:
  // https://discord.com/developers/docs/resources/channel#embed-object-embed-limits
  toEmbed(){
    return {
      title: this.title.slice(0, 256),
      description: this.description.slice(0, 4096),
      author: {
        name: this.author.slice(0, 256)
      },
      url: this.url
    }
  }
}
