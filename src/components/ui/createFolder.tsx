"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DialogCloseButton = () => {
  const [folderName, setFolderName] = useState<string>("");

  const handleClick = () => {
    console.log(folderName);
  };
  return (
    <>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="text"
              className="outline-blue-300"
              placeholder="Folder name"
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="submit"
              variant="secondary"
              onClick={() => handleClick()}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogCloseButton;
