# PDF Reader

A single-page app where you can enter your OpenAI API key, upload a PDF and ask questions about it. Answers are generated with a Retrieval-Augmented Generation (RAG) pipeline built on LangChain, so the model only answers from the content of your PDF.

Live Link: https://react-pdf-reader.web.app/

## How It Works

1. **PDF parsing** – The uploaded PDF is read in the browser and its text is extracted page by page with PDF.js (via `react-pdf`).
2. **Chunking** – LangChain's `RecursiveCharacterTextSplitter` splits the text into 1000-character chunks with 200 characters of overlap.
3. **Embeddings** – Each chunk is embedded with OpenAI's `text-embedding-3-small` model through `@langchain/openai`.
4. **Vector store** – The embeddings are stored in LangChain's in-memory vector store (`MemoryVectorStore`).
5. **Retrieval** – For every question, a similarity search fetches the 5 most relevant chunks.
6. **Generation** – The retrieved chunks are injected into the prompt as context and sent to `gpt-3.5-turbo`. The model is instructed to answer only from that context, and to reply "Unable to find the data in the PDF" otherwise.

Everything runs client-side — your API key and PDF never touch a custom backend.

## Tech Stack

### AI / LLM
- **RAG (Retrieval-Augmented Generation)** – grounds answers in the uploaded document
- **LangChain** (`langchain`, `@langchain/openai`) – text splitting, embeddings, vector store and LLM orchestration
- **Vector store** – LangChain `MemoryVectorStore` (in-browser, in-memory) with similarity search
- **OpenAI** – `text-embedding-3-small` for embeddings, `gpt-3.5-turbo` for answers

### Frontend
- **React 18** with **Vite**
- **Redux Toolkit** / React Redux – app state (API key, vector store, LLM, chat history)
- **Tailwind CSS** + **Flowbite React** – styling and UI components
- **react-pdf** (PDF.js) – PDF text extraction
- **React Icons**, **React Toastify**

### Deployment / CI/CD
- **Firebase Hosting** (Google Cloud) – static hosting
- **GitHub Actions** – automatic build and deploy to Firebase on push to `main`, plus preview deploys for pull requests

## Running Locally

```bash
npm install
npm run dev
```

Then open the app, paste your OpenAI API key, upload a PDF and start asking questions.

## Screenshots

### Homepage
<img width="960" alt="image" src="https://github.com/TasnimAnas/PDF-Reader/assets/80065444/bf3486b5-35b7-45ed-b0c3-088eece68d84">

### Chatting Page
<img width="960" alt="image" src="https://github.com/TasnimAnas/PDF-Reader/assets/80065444/2f9b7562-6c15-4d19-9320-db58f1c99d15">
