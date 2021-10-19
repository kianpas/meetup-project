import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

//SSR
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

//SSG
export const getStaticProps = async () => {
  // fetch data from an api

  const client = await MongoClient.connect(
    "mongodb+srv://first-user1:<password>@cluster0.zay22.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();

  //무조건 객체 리턴
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
