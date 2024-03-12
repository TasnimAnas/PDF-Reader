import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  apiKey: "",
  vectorStores: null,
  pdfName: "",
  llm: null,
  chats: [],
};
export const dataSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    formSubmit: (state, action) => {
      const { apiKey, pdfName, vectorStores, llm } = action.payload;
      state.apiKey = apiKey;
      state.pdfName = pdfName;
      state.llm = llm;
      state.vectorStores = vectorStores;
    },
    addChat: (state, action) => {
      const chat = {
        message: action.payload.message,
        sender: action.payload.sender,
        time: new Date(),
        id: nanoid(),
      };
      state.chats.push(chat);
    },
  },
});
export const { formSubmit, addChat } = dataSlice.actions;
export default dataSlice.reducer;
