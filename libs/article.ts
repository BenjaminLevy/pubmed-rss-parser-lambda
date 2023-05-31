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
  toEmbed(){
    return {
      title: this.title,
      description: this.description,
      author: {
        name: this.author
      },
      url: this.url
    }
  }
}

// {
//       "title": "Aquablation Therapy in Large Prostates (80-150 mL) for Lower Urinary Tract Symptoms Due to Benign Prostatic Hyperplasia: Final WATER II 5-Year Clinical Trial Results",
//       "description": "CONCLUSIONS: At 5-years of prospective follow-up, the Aquablation procedure was shown to be safe with durable efficacy and low rates of retreatment in men with large prostates (80-150 mL).",
//       "author": {
//         "name": "Naeem Bhojani et al."
//       },
//       "url": "https://pubmed.ncbi.nlm.nih.gov/37115632"
//     },
