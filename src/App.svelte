<main>
    <div>        
        <h3>My knowledge base</h3>
        <p><textarea disabled={is_doc_setting_await} cols="70" rows="20" bind:value={source_text}></textarea></p>
        <button on:click={() => set_document_text()} disabled={is_doc_setting_await}>{chain ? "Save" : "Load"} document</button>
    </div>
    <div>
        {#if chain}
            <h3>Your question</h3>
            <p>Select</p>
            <select bind:value={question}>
                {#each questions as question}
                    <option>{question}</option>
                {/each}
            </select>
            <p>... or write your own</p>
            <p><input type="text" bind:value={question}></p>
            <button on:click={send_question} disabled={is_respose_await}>Ask question</button>
            <h3>Answer</h3>
            <p>{is_respose_await ? "Loading..." : answer?.text}</p>
        {/if}
    </div>
</main>



<style>
main {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
input, select {
    width: 90%;
}
</style>

<script>
import {get_chain} from "./functions.js"
import document from "./document.js"
let source_text = document

let chain = null
let is_respose_await = false
let is_doc_setting_await = false

const questions = [
    "What is the price of education for Lithuanian students in the Netherlands?",
    "If there are any discounts for first-year studies in The Netherlands for Lithuanian students?",
    "If I must pass the IELTS or TOEFL test if I want to study in the Netherlands?",
    "What other options to prove English language skills do Lithuanian students have besides taking IELTS or TOEFL?",
    "If there are any financial support possibilities for Lithuanian students to study in the Netherlands?",
    "Is it true that public transport is free in the Netherlands for the students?",
    "What kind of universities are in the Netherlands? What is the difference between them?",
    "Why it is worth applying to the Netherlands with Kastu help?",
    "What would Lenin shout?",
    "Tell me some New Year's poem",
    "What role does Masha occupy?"
]
let question = questions[0]
let answer = {text: "Send your question"}

async function set_document_text() {
    chain = null
    is_doc_setting_await = true
    chain = await get_chain(source_text)
    is_doc_setting_await = false
}

async function send_question() {
    is_respose_await = true
    if (chain) {
        answer = await chain.call({query: question})        
    } else {
        answer = {text: "<--- Set document"}
    }
    is_respose_await = false
}


</script>