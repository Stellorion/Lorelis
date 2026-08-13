import ChatInterface from "@/components/chat-interface";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/d8/bb/2c/d8bb2c92d768a33582a5cd62b6cb4010.jpg')",
      }}
    >
      <div>
        <ChatInterface></ChatInterface>
      </div>
    </div>
  );
}
