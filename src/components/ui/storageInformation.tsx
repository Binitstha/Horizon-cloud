"use client";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../../../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { FaFileImage, FaPhotoVideo } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const StorageInfo = () => {
  const [fileSize, setFileSize] = useState<number>(0);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [totalImageSize, setTotalImageSize] = useState<number>(0);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [totalVideoSize, setTotalVideoSize] = useState<number>(0);
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [totalDocumentSize, setTotalDocumentSize] = useState<number>(0);
  const [totalOthers, setTotalOthers] = useState<number>(0);
  const [totalOtherSize, setTotalOtherSize] = useState<number>(0);

  const { data: session } = useSession();

  useEffect(() => {
    const db = getFirestore(app);

    if (session?.user?.email) {
      const email = session.user.email;

      // Define the query to fetch files belonging to the current user
      const q = query(collection(db, "files"), where("createdBy", "==", email));

      // Subscribe to changes in the query results using onSnapshot
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let totalSize = 0;
        let imageCount = 0;
        let videoCount = 0;
        let documentCount = 0;
        let othersCount = 0;
        let imageSize = 0;
        let videoSize = 0;
        let documentSize = 0;
        let othersSize = 0;

        // Iterate through each document in the snapshot
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.size) {
            totalSize += data.size; // Accumulate total size
          }

          if (data.type && data.size) {
            switch (data.type) {
              case "svg":
              case "jpeg":
              case "png":
              case "jpg":
                imageCount++;
                imageSize += data.size; // Accumulate image size
                break;
              case "webm":
              case "mp4":
              case "avi":
              case "mkv":
                videoCount++;
                videoSize += data.size; // Accumulate video size
                break;
              case "pdf":
              case "doc":
              case "docx":
              case "txt":
                documentCount++;
                documentSize += data.size; // Accumulate document size
                break;
              default:
                othersCount++;
                othersSize += data.size; // Accumulate size for other types
                break;
            }
          }
        });

        // Update state with calculated values
        setFileSize(totalSize / (1024 * 1024)); // Convert to MB

        setTotalImages(imageCount);
        setTotalVideos(videoCount);
        setTotalDocuments(documentCount);
        setTotalOthers(othersCount);

        setTotalImageSize(imageSize / (1024 * 1024));
        setTotalVideoSize(videoSize / (1024 * 1024));
        setTotalDocumentSize(documentSize / (1024 * 1024));
        setTotalOtherSize(othersSize / (1024 * 1024));
      });

      // Clean up listener on component unmount
      return () => unsubscribe();
    }
  }, [session]); // Dependency array ensures effect runs when session changes

  return (
    <main>
      <section>
        <div className="text-xl">{fileSize.toFixed(2)} MB of 50 MB used</div>
        {/* Progress bar section */}
        <div className="my-4 w-full h-3 border-2 flex">
          <div
            style={{ width: `${(totalImages/50) * 100}%` }}
            className="bg-green-300"
          ></div>
          <div
            style={{ width: `${(totalVideos/50) * 100}%` }}
            className="bg-blue-300"
          ></div>
          <div
            style={{ width: `${(totalDocuments/50) * 100}%` }}
            className="bg-yellow-300"
          ></div>
          <div
            style={{ width: `${(totalOthers/50) * 100}%` }}
            className="bg-red-300"
          ></div>
        </div>
      </section>
      <section className="mt-3">
        {/* Section for displaying file type counts and sizes */}
        <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
          <div className="flex justify-start items-center gap-4">
            <div className="text-3xl p-2 rounded-md bg-green-300">
              <FaFileImage />
            </div>
            <div className="flex flex-col justify-start">
              <div>Images</div>
              <div className="text-sm text-gray-700">{totalImages}</div>
            </div>
          </div>
          <div className="">{totalImageSize.toFixed(2)} MB</div>
        </div>
        <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
          <div className="flex justify-start items-center gap-4">
            <div className="text-3xl p-2 rounded-md bg-blue-300">
              <FaPhotoVideo />
            </div>
            <div className="flex flex-col justify-start">
              <div>Videos</div>
              <div className="text-sm text-gray-700">{totalVideos}</div>
            </div>
          </div>
          <div className="">{totalVideoSize.toFixed(2)} MB</div>
        </div>
        <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
          <div className="flex justify-start items-center gap-4">
            <div className="text-3xl p-2 rounded-md bg-yellow-300">
              <IoDocumentAttach />
            </div>
            <div className="flex flex-col justify-start">
              <div>Documents</div>
              <div className="text-sm text-gray-700">{totalDocuments}</div>
            </div>
          </div>
          <div className="">{totalDocumentSize.toFixed(2)} MB</div>
        </div>
        <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
          <div className="flex justify-start items-center gap-4">
            <div className="text-3xl p-2 rounded-md bg-red-300">
              <MdErrorOutline />
            </div>
            <div className="flex flex-col justify-start">
              <div>Others</div>
              <div className="text-sm text-gray-700">{totalOthers}</div>
            </div>
          </div>
          <div className="">{totalOtherSize.toFixed(2)} MB</div>
        </div>
      </section>
    </main>
  );
};

export default StorageInfo;
