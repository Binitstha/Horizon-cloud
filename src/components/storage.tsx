import UserProfile from "./ui/userProfile";
import StorageInfo from "./ui/storageInformation";

const Storage = () => {
  return (
    <div className="lg:h-screen absolute right-6 flex flex-col gap-10 p-5 lg:sticky lg:top-0">
      <div className="flex justify-center items-start">
        <UserProfile />
      </div>
      <div className="lg:flex hidden justify-center items-start">
        <StorageInfo />
      </div>
    </div>
  );
};

export default Storage;
