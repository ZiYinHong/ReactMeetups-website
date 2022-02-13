import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb"; //NextJS will not include this in your client's side bundle.
import { Fragment } from 'react';
import Head from 'next/head';   // add a title in HTML // Prepare for deployment and description is for search engine to search it.


// will receive props set in getStaticProps
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// use one of them : getServerSideProps/ getStaticProps

// (reserved name)
// will run on the server after deployment(not on a client browser)
// run for every incoming requests(but you need to wait for request, use when data change frequencly)
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

  // fetch data from API/filesystem..
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }


//static site generation
// it need to be this name (reserved name)
// will perform getStaticProps before perform component function
// pregenerate the page during the build process
export async function getStaticProps() {
  // fetch data from API..

  const client = await MongoClient.connect(
    "mongodb+srv://michelle:mimi0933547250@cluster0.16fq1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray(); //find will return all documents

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // the page will be regenerate by server every 1 seconds. after deployment
  };
}

export default HomePage;
