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
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";

const DialogCloseButton = () => {
  return (
    <>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              placeholder="Folder name"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary">
              Create
            </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogCloseButton;
