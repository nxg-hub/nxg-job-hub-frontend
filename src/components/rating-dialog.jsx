import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/star-rating";

export function RatingDialog({
  open,
  onOpenChange,
  initialRating = 0,
  initialFeedback = "",
  onSubmit,
  serviceTitle,
}) {
  const [rating, setRating] = useState(initialRating);
  const [feedback, setFeedback] = useState(initialFeedback);

  const handleSubmit = () => {
    onSubmit(rating, feedback);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Client Rating</DialogTitle>
          <DialogDescription>
            Record the client's rating and feedback for "{serviceTitle}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex justify-center py-2">
              <StarRating
                rating={rating}
                size="lg"
                interactive={true}
                onRatingChange={setRating}
                className="gap-2"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="feedback"
              className="text-sm font-medium">
              Client Feedback
            </label>
            <Textarea
              id="feedback"
              placeholder="Enter client's comments about the service..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Rating</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
