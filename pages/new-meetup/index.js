import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {

  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers :{
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    console.log(data);

    //초기화면으로 리턴
    router.push("/");
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
