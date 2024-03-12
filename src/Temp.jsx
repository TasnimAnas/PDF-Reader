import React, { useState } from "react";
import { pdfjs } from "react-pdf";

// Configure pdfjs worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState("");

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = await extractPdfText(e.target.result);
      setPdfText(text);
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

  return (
    <div>
      <h1>PDF Reader</h1>
      <input type="file" onChange={onFileChange} />
      {file && (
        <div>
          <h3>Text from PDF:</h3>
          <div>{pdfText}</div>
        </div>
      )}
    </div>
  );
}

export default App;
