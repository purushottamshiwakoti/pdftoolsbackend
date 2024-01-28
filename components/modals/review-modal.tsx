import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddStepForm } from "../forms/add-steps-form";
import { Button } from "../ui/button";
import { AddReviewForm } from "../forms/add-review-form";

export const ReviewModal = () => {
  return (
    <>
      <Dialog>
        <Button asChild>
          <DialogTrigger>Add Rating</DialogTrigger>
        </Button>
        <DialogContent>
          <AddReviewForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
