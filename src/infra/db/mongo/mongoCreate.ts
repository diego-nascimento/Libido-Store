import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGOURL

async function dbConnect () {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true
  }

  await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    return mongoose
  })
}

export default dbConnect
