//ex:  http://localhost:3000/M1
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from 'react';
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// return an object of dynamic segment value user might enter in the runtime
// (because the page will be pregenerate during the build process using getStaticProps)
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://michelle:mimi0933547250@cluster0.16fq1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();  // 1: only contain id but not others

  client.close();

  return {
    fallback: false, //tell nextJS whether your paths array contain all support params valus(false) or some of them(true) //ex; m3 --> 404
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}


export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  //console.log(meetupId); // will not see the result on F12 console,because it only run on build time

  const client = await MongoClient.connect(
    "mongodb+srv://michelle:mimi0933547250@cluster0.16fq1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
