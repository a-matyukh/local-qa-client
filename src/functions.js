import { Document } from "langchain/document"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers"
import { Ollama } from "langchain/llms/ollama"
import { RetrievalQAChain } from "langchain/chains"
import { VoyVectorStore } from "langchain/vectorstores/voy"
import { Voy as VoyClient } from "voy-search"

export async function get_chain(source_text) {
    const docs = [new Document({ pageContent: source_text })]
    const splitter = new RecursiveCharacterTextSplitter({
        chunkOverlap: 0, chunkSize: 500
    })
    const splitDocuments = await splitter.splitDocuments(docs)
    
    const voyClient = new VoyClient();
    const store = new VoyVectorStore(voyClient, new HuggingFaceTransformersEmbeddings());
    await store.addDocuments(splitDocuments)

    const model = new Ollama({
        baseUrl: "http://localhost:11434",
        model: "openchat"
    })
    return RetrievalQAChain.fromLLM(model, store.asRetriever())
}
