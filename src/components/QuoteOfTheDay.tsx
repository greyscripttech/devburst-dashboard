
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const quotes = [
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "Code is like humor. When you have to explain it, it's bad.",
  "The best error message is the one that never shows up.",
  "Simplicity is the soul of efficiency.",
  "Without requirements or design, programming is the art of adding bugs to an empty text file.",
  "A good programmer is someone who always looks both ways before crossing a one-way street.",
  "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.",
  "The most important property of a program is whether it accomplishes the intention of its user.",
];

const devTips = [
  "Use keyboard shortcuts to boost your productivity.",
  "Commit small changes frequently rather than large changes rarely.",
  "Learn how to use your debugger effectively.",
  "Write tests before fixing bugs to prevent regression.",
  "Take regular breaks to prevent burnout and maintain focus.",
  "Document your code as if the person who will maintain it is a violent psychopath who knows where you live.",
  "Optimize your code for readability first, performance second.",
  "Peer reviews catch more bugs than testing alone.",
  "Keep your dependencies updated, but test thoroughly before upgrading in production."
];

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [tip, setTip] = useState(devTips[0]);
  const [activeTab, setActiveTab] = useState<"quote" | "tip">("quote");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Change content every 30 seconds
    const interval = setInterval(() => {
      setVisible(false);
      
      setTimeout(() => {
        if (activeTab === "quote") {
          setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        } else {
          setTip(devTips[Math.floor(Math.random() * devTips.length)]);
        }
        setVisible(true);
      }, 500);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const toggleTab = () => {
    setVisible(false);
    setTimeout(() => {
      setActiveTab(activeTab === "quote" ? "tip" : "quote");
      setVisible(true);
    }, 500);
  };

  return (
    <Card className="bg-gradient-to-br from-card to-muted/80 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" onClick={toggleTab}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium">{activeTab === "quote" ? "Quote of the Day" : "Developer Tip"}</span>
          </div>
          <div className="text-xs text-muted-foreground">April 30, 2025</div>
        </div>
        <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm italic">"{activeTab === "quote" ? quote : tip}"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteOfTheDay;
