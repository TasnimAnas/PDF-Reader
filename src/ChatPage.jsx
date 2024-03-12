import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SingleChat from "./SingleChat";
import { addChat } from "./store/dataSlice";
import { QnA } from "./utils/connectOpenAI";
const ChatPage = () => {
  const { vectorStores, llm, chats } = useSelector((state) => state.dataSlice);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userChat = { message, sender: "user" };
    dispatch(addChat(userChat));
    setMessage("");
    try {
      const answer = await QnA(message, vectorStores, llm);
      const LLMChat = { message: answer, sender: "LLM" };
      dispatch(addChat(LLMChat));
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow overflow-y-auto flex flex-col w-full max-w-3xl shadow-lg mx-auto">
      <div className="flex-grow py-2 overflow-y-auto px-3 flex flex-col gap-3">
        {chats.map((message) => {
          return <SingleChat key={message.id} {...message} />;
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-0 w-full flex gap-2 border rounded py-2 px-3"
      >
        <input
          type="text"
          name="message"
          disabled={loading}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Write your question"
          className="flex-grow rounded-md py-2 px-8"
        />
        <Button type="submit" disabled={loading} className="flex-0">
          {loading ? <Spinner /> : <BsFillSendFill size={20} />}
        </Button>
      </form>
    </div>
  );
};
export default ChatPage;
