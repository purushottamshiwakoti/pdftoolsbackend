import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { AddStepForm } from "../forms/add-steps-form";
import { Button } from "../ui/button";

export const StepModal = ({ id }: { id: string | undefined }) => {
  return (
    <>
      <Dialog>
        <Button asChild>
          <DialogTrigger>Add Step</DialogTrigger>
        </Button>
        <DialogContent>
          <AddStepForm id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
};
