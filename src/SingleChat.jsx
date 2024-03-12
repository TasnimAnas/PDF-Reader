const SingleChat = ({ message, sender, time, id }) => {
  return (
    <div
      className={`flex ${sender === "LLM" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`px-4 py-2 border rounded-lg shadow w-fit text-justify ${
          sender === "LLM" ? "bg-white" : "bg-black"
        } ${sender === "LLM" ? "text-black" : "text-white"}`}
      >
        {message}
      </div>
    </div>
  );
};
export default SingleChat;
