// define function only run on server never on the client
// these function will then trigger when every request is sent to this route

import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  //req :contain data in the incoming request
  //res : will need when sending back respond
  if (req.method === "POST") {
    const data = req.body; //expect that the data contain: title, image, address, description in AddNewMeetUpf Form

    //return a promise
    const client = await MongoClient.connect(
      "mongodb+srv://michelle:mimi0933547250@cluster0.16fq1.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    //console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" }); // add a message key to our data respond
  }
}

export default handler;
