import UserProfile from "./ui/userProfile";
import StorageInfo from "./ui/storageInformation";

const storage = () => {
  return (
    <div className="h-screen flex flex-col gap-10 p-5 sticky top-0">
      <div className=" flex justify-center items-start ">
        <UserProfile />
      </div>
      <div className="">
        <StorageInfo />
      </div>
    </div>
  );
};

export default storage;
