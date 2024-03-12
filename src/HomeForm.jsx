import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formSubmit } from "./store/dataSlice";
import { prepareLLM } from "./utils/connectOpenAI";

// Configure pdfjs worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const HomeForm = () => {
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    setLoading(true);
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = await extractPdfText(e.target.result);
      setPdfText(text);
      setLoading(false);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const extractPdfText = async (fileData) => {
    const pdf = await pdfjs.getDocument(new Uint8Array(fileData)).promise;
    let text = "";
    for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
      const page = await pdf.getPage(i);
      const currentTextArr = (await page.getTextContent()).items;
      let currentText = "";
      currentTextArr.forEach((e) => {
        currentText += e.str + " ";
      });
      text += currentText;
    }
    return text;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const apiKey = e.target.apiKey.value;
    const pdfName = e.target.pdfFile.files[0].name;
    try {
      const { vectorStores, llm } = await prepareLLM(pdfText, apiKey);
      dispatch(formSubmit({ apiKey, vectorStores, llm, pdfName }));
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col p-3 items-center">
      <h2 className="font-bold text-3xl">Chat with PDF</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col items-center justify-center gap-2 py-14 px-20 border rounded-lg shadow"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="apiKey" className="text-sm mb-2">
            OpenAI API Key:
          </label>
          <input
            type="text"
            required
            name="apiKey"
            id="apiKey"
            placeholder="abc123def456ghi78..."
            className="border rounded px-3 py-1"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="pdfFile" className="text-sm mb-2">
            PDF File:
          </label>
          <input
            type="file"
            accept=".pdf"
            required
            name="pdfFile"
            id="pdfFile"
            className="rounded"
            onChange={onFileChange}
          />
        </div>
        <a href="">
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 py-1 px-6 mt-6"
          >
            {loading ? <Spinner /> : "Start Chatting"}
          </Button>
        </a>
      </form>
    </div>
  );
};
export default HomeForm;
