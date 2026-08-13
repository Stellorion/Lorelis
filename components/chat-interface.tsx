"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulated API streaming delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I am analyzing your topic across multiple sources. Detailed comparison dashboard coming next!",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-between h-164 bg-slate-950 text-slate-100 p-4 md:p-8">

      {/* Message Scroller Container */}
      <div className="w-full max-w-2xl flex-1 min-h-0 mb-4 relative">
        <MessageScrollerProvider autoScroll>
          <MessageScroller className="h-full rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <MessageScrollerViewport className="h-full">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Bot className="w-12 h-12 text-slate-500 mb-3" />
                  <h3 className="font-semibold text-lg text-slate-300">
                    Start a Research Inquiry
                  </h3>
                </div>
              ) : (
                <MessageScrollerContent className="space-y-4">
                  {messages.map((msg) => (
                    <MessageScrollerItem
                      key={msg.id}
                      messageId={msg.id}
                      scrollAnchor={msg.sender === "user"}
                      className={`flex gap-3 items-start ${
                        msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <Avatar className="w-8 h-8 border border-slate-700">
                        {msg.sender === "user" ? (
                          <AvatarFallback className="bg-slate-800 text-slate-200">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-gray-950 text-gray-400">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <Card
                        className={`p-3.5 max-w-[80%] text-sm rounded-xl border ${
                          msg.sender === "user"
                            ? "bg-gray-600 border-gray-500 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-200"
                        }`}
                      >
                        {msg.text}
                      </Card>
                    </MessageScrollerItem>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 items-center text-slate-400 text-sm italic">
                      <Avatar className="w-8 h-8 border border-slate-700">
                        <AvatarFallback className="bg-gray-950 text-gray-400">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span>Searching & comparing sources...</span>
                    </div>
                  )}
                </MessageScrollerContent>
              )}
            </MessageScrollerViewport>

            {/* Jump-to-bottom Floating Action Button */}
            <MessageScrollerButton className="absolute bottom-4 right-4 bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2 shadow-lg" />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      {/* Input Control */}
      <div className="w-full max-w-2xl shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800 shadow-lg focus-within:border-gray-500 transition"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a Prompt"
            className="bg-transparent border-none text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-500"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}