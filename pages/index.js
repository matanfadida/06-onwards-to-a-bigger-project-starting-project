import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <Fragment>
    <Head>
      <title>React Meetup</title>
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>
};

export async function getStaticProps() {

  const client = await MongoClient.connect(
    "mongodb+srv://matan:2JjrOiOBPnz5E1My@cluster0.1p1gd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //get hold of that database to which we're connecting here.

  const meetupCollection = db.collection("meetups");

  const meetupsList = await meetupCollection.find().toArray();
  
  client.close();

  return {
    props: {
      meetups: meetupsList.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
