import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddFeaturesForm } from "../forms/add-features-form";
import { Button } from "../ui/button";

export const FeaturesModal = ({ id }: { id: string | undefined }) => {
  return (
    <>
      <Dialog>
        <Button asChild>
          <DialogTrigger>Add Features</DialogTrigger>
        </Button>
        <DialogContent>
          <AddFeaturesForm id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
};
