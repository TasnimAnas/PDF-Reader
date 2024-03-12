import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const prepareLLM = async (text, key) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const output = await splitter.splitText(text);
    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-3-small",
      openAIApiKey: key,
    });

    const vectorStores = await MemoryVectorStore.fromTexts(
      output,
      undefined,
      embeddings
    );

    const llm = new OpenAI({
      modelName: "gpt-3.5-turbo-0125",
      openAIApiKey: key,
    });

    return { vectorStores, llm };
  } catch (error) {
    throw error;
  }
};

export const QnA = async (question, vectorStore, LLM) => {
  try {
    const similarData = await vectorStore.similaritySearch(question, 5);
    let data = "";
    similarData.forEach((e) => {
      data += `${e.pageContent}\n\n`;
    });
    const query = `Question: ${question}?\n\nINFO: ${data}\n\nNOTE: Answer the question from the given INFO only. If the answer does not exist in the INFO, say "Unable to find the data in the PDF"`;
    const answer = await LLM.invoke(query);
    return answer;
  } catch (error) {
    throw error;
  }
};
