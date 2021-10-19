import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

//fallback paths 아래의 param값을 지원하는지 여부
//false는 지원 한다는 의미, true면 아이디값을 동적으로 생성
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://first-user1:<password>@cluster0.zay22.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

//staticprop에서는 useRouter 사용할 수 없음
//context 사용
export const getStaticProps = async (context) => {
  //fetch data for single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://first-user1:<password>@cluster0.zay22.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetups = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      },
    },
  };
};

export default MeetupDetails;
