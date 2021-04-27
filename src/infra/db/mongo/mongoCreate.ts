import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,

  async connect (url: string): Promise<void>{
    this.url = url
    this.client = await MongoClient.connect('mongodb+srv://piro-libido:diego123456qwer@cluster0.da9st.mongodb.net/strapi-libido?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async  getCollection (name: string): Promise<Collection> {
    if (!this.client.isConnected()){
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithOutID } = collection
    return Object.assign({}, collectionWithOutID, { id: _id })
  }
}
