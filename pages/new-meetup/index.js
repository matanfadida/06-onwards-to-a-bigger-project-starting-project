import {useRouter} from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const sendDataMeetupHandler = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    console.log(data);

    router.push('/');
    };
  
  return <Fragment>
    <Head>
      <title>Add a new meetup</title>
    </Head>
    <NewMeetupForm onAddMeetup={sendDataMeetupHandler} />;
  </Fragment>
};

export default NewMeetupPage;