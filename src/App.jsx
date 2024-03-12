import { useSelector } from "react-redux";
import ChatPage from "./ChatPage";
import Header from "./Header";
import HomeForm from "./HomeForm";
function App() {
  const selector = useSelector((state) => {
    return state.dataSlice;
  });
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      {selector.vectorStores && selector.llm ? (
        <>
          <hr />
          <ChatPage />
        </>
      ) : (
        <HomeForm />
      )}
    </div>
  );
}

export default App;

