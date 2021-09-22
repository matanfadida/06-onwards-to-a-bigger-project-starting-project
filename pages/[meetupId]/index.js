import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from 'next/head';

import MeetupDetails from "../../components/meetups/MeetupDetails";

const MeetupDetail = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://matan:2JjrOiOBPnz5E1My@cluster0.1p1gd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //get hold of that database to which we're connecting here.

  const meetupCollection = db.collection("meetups");

  const meetupsList = await meetupCollection.find().toArray();

  client.close();

  return {
    fallback: false,
    paths: meetupsList.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://matan:2JjrOiOBPnz5E1My@cluster0.1p1gd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //get hold of that database to which we're connecting here.

  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetail;
