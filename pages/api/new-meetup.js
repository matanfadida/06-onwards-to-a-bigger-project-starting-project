import { MongoClient } from 'mongodb';

const Handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://matan:2JjrOiOBPnz5E1My@cluster0.1p1gd.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db(); //get hold of that database to which we're connecting here.

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);
      console.log(result);

      client.close();
      res.status(201).json({message: 'Meetup inserted!'})
  }
};

export default Handler;
