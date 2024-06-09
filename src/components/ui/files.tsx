import { SiFiles } from "react-icons/si";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const files = () => {
  const filesList = [
    { id: 1, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 2, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 3, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 4, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 5, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 6, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 7, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
    { id: 8, name: "file 1", modifiedDate: "Jun 23,2024", size: "200KB" },
  ];

  return (
    <section className="">
      <Table>
        <TableHeader>
          <TableRow className="flex">
            <TableHead>Name</TableHead>
            <TableHead>Modified date</TableHead>
            <TableHead>size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filesList.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <div className="flex gap-3 justify-start items-center">
                  <SiFiles />
                  <div>{file.name}</div>
                </div>
              </TableCell>
              <TableCell>{file.modifiedDate}</TableCell>
              <TableCell>{file.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default files;
