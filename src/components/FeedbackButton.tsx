
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageSquarePlus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FeedbackButton = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("general");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast({
        title: "Empty feedback",
        description: "Please provide some feedback before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log("Feedback submitted:", { type: feedbackType, message: feedback });
    
    toast({
      title: "Feedback received",
      description: "Thank you for your feedback!"
    });
    
    setFeedback("");
    setFeedbackType("general");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="rounded-full h-12 w-12 bg-brand-purple hover:bg-brand-purple-dark shadow-lg" size="icon">
            <MessageSquarePlus className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Send Feedback</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Help us improve by sharing your thoughts.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-type">What's this about?</Label>
              <RadioGroup 
                id="feedback-type" 
                value={feedbackType} 
                onValueChange={setFeedbackType} 
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general">General</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="project" id="project" />
                  <Label htmlFor="project">Project</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deployment" id="deployment" />
                  <Label htmlFor="deployment">Deployment</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback">Your feedback</Label>
              <Textarea 
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-32 w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Feedback</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FeedbackButton;
