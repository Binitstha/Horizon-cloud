import { FaFileAlt, FaFolder } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const FoldersSkeleton = () => {
  return (
    <section className="flex justify-start items-center">
      <main className="mt-5 justify-start items-center flex flex-wrap gap-5">
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
        <FolderSkeleton />
      </main>
    </section>
  );
};

export const FolderSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 border-2 h-32 w-44 text-xl rounded-xl p-2 justify-center items-center animate-pulse">
      <div className="flex flex-col justify-center items-center w-full">
        <span className="text-5xl text-gray-300 animate-pulse">
          <FaFolder />
        </span>
        <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded mt-2"></div>
      </div>
      <div className="flex justify-center items-center gap-10 w-full mt-2">
        <div className="h-5 w-20 bg-gray-300 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export const FilesSkeleton = () => {
  return (
    <>
      <section className="">
        <Table>
          <TableHeader>
            <TableRow className="flex">
              <TableHead>
                <div className="w-[30.5rem]">Name</div>
              </TableHead>
              <TableHead>Modified date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full mr-2"></div>
                    <div className="h-4 w-96 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-16 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export const SubFolderSkeleton = () => {
  return (
    <>
      <main className=" pt-5 p-10">
        <div className=" rounded-md p-5">
          <div className=" flex justify-between">
            <div className=" w-32 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <span className=" text-blue-500">View all</span>
          </div>
          <div>
            <section className="flex justify-start items-center ">
              <main className="mt-5 justify-start items-start flex flex-col flex-wrap w-full">
                <div className="w-full">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <>
                      <div className="flex  text-lg text-md w-full rounded-xl cursor-pointer p-2 justify-between items-center transition-all duration-150">
                        <div className=" flex justify-start gap-2 items-center  w-full h-8 rounded-md animate-pulse bg-gray-300"></div>
                        <div className="flex justify-end items-center gap-10 w-full">
                          <div className="flex justify-center items-center h-7 w-7 bg-gray-300 rounded-md animate-pulse"></div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </main>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export const StorageInfoSkeleton = () => {
  return (
    <>
      <main>
        <section>
          <div className="text-xl w-44 bg-gray-300 rounded-md animate-pulse h-7"></div>
          <div className="my-4 w-full h-4 flex bg-gray-300 animate-pulse rounded-md"></div>
        </section>
        <section className="mt-3">
          <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
            <div className="flex justify-start items-center gap-4">
              <div className="text-3xl p-2 rounded-md bg-green-300 h-10 w-10 animate-pulse"></div>
              <div className="flex flex-col justify-start gap-1">
                <div className="h-6 w-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="text-sm bg-gray-300 animate-pulse rounded-md h-5 w-10"></div>
              </div>
            </div>
            <div className="bg-gray-300 animate-pulse rounded-md h-8 w-14"></div>
          </div>
          <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
            <div className="flex justify-start items-center gap-4">
              <div className="text-3xl p-2 rounded-md bg-blue-300 h-10 w-10 animate-pulse"></div>
              <div className="flex flex-col justify-start gap-1">
                <div className="h-6 w-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="text-sm bg-gray-300 animate-pulse rounded-md h-5 w-10"></div>
              </div>
            </div>
            <div className="bg-gray-300 animate-pulse rounded-md h-8 w-14"></div>
          </div>
          <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
            <div className="flex justify-start items-center gap-4">
              <div className="text-3xl p-2 rounded-md bg-yellow-300 h-10 w-10 animate-pulse"></div>
              <div className="flex flex-col justify-start gap-1">
                <div className="h-6 w-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="text-sm bg-gray-300 animate-pulse rounded-md h-5 w-10"></div>
              </div>
            </div>
            <div className="bg-gray-300 animate-pulse rounded-md h-8 w-14"></div>
          </div>
          <div className="flex justify-between text-lg p-3 items-center border-b-2 h-16">
            <div className="flex justify-start items-center gap-4">
              <div className="text-3xl p-2 rounded-md bg-red-300 h-10 w-10 animate-pulse"></div>
              <div className="flex flex-col justify-start gap-1">
                <div className="h-6 w-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="text-sm bg-gray-300 animate-pulse rounded-md h-5 w-10"></div>
              </div>
            </div>
            <div className="bg-gray-300 animate-pulse rounded-md h-8 w-14"></div>
          </div>
        </section>
      </main>
    </>
  );
};

export const UserProfileSkeleton = () => {
  return (
    <div className="border-2 flex justify-start p-3 gap-3 rounded-md items-center w-full h-20 ">
      <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="flex flex-col gap-2">
        <div className="w-28 h-5 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-40 h-5 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="flex text-3xl w-14 cursor-pointer justify-end items-center">
        <div className="h-10 w-10 rounded-md animate-pulse bg-gray-300"></div>
      </div>
    </div>
  );
};
