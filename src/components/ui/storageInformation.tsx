"use client";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../../../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { FaFileImage } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
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
    const fileFetch = async () => {
      const db = getFirestore(app);
      if (session?.user?.email) {
        const email = session?.user?.email;
        try {
          const q = query(
            collection(db, "files"),
            where("createdBy", "==", email),
          );
          const snapshot = await getDocs(q);

          let totalSize = 0;
          let imageCount = 0;
          let videoCount = 0;
          let documentCount = 0;
          let othersCount = 0;
          let imageSize = 0;
          let videoSize = 0;
          let documentSize = 0;
          let othersSize = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.size) {
              totalSize += data.size;
            }

            if (data.type && data.size) {
              switch (data.type) {
                case "svg":
                case "jpeg":
                case "png":
                case "jpg":
                  imageCount++;
                  imageSize += data.size;
                  break;
                case "webm":
                case "mp4":
                case "avi":
                case "mkv":
                  videoCount++;
                  videoSize += data.size;
                  break;
                case "pdf":
                case "doc":
                case "docx":
                case "txt":
                  documentCount++;
                  documentSize += data.size;
                  break;
                default:
                  othersCount++;
                  othersSize += data.size;
                  break;
              }
            }
          });

          setFileSize(totalSize / (1024 * 1024)); // Convert to MB
          setTotalImages(imageCount);
          setTotalVideos(videoCount);
          setTotalDocuments(documentCount);
          setTotalOthers(othersCount);

          setTotalImageSize(imageSize / (1024 * 1024));
          setTotalVideoSize(videoSize / (1024 * 1024));
          setTotalDocumentSize(documentSize / (1024 * 1024));
          setTotalOtherSize(othersSize / (1024 * 1024));
        } catch (err) {
          console.log(err);
        }
      }
    };
    fileFetch();
  }, [session]);

  return (
    <main>
      <section>
        <div>{fileSize.toFixed(2)} MB of 50 MB used</div>
        <div>space bar</div>
      </section>
      <section>
        <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
          <div className="flex justify-start items-center gap-4">
            <div className="text-3xl p-2 rounded-md bg-gray-200">
              <FaFileImage />
            </div>
            <div className=" flex flex-col justify-start">
              <div>Images </div>
              <div className="text-sm text-gray-700">{totalImages}</div>
            </div>
          </div>
          <div className="">{totalImageSize.toFixed(2)}MB</div>
        </div>
        <div>Videos: {totalVideos}</div>
        <div>Documents: {totalDocuments}</div>
        <div>Others: {totalOthers}</div>
      </section>
    </main>
  );
};

export default StorageInfo;
