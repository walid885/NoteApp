const btnEL = document.getElementById("btn")
const appEL = document.getElementById("app")

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content)
    appEL.insertBefore(noteEl,btnEL)
    
});

function createNoteEl(id, content){
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder="Empty note"
    element.value=content

    element.addEventListener("dblclick",()=>{
        const warning = confirm("Do you want to delete this note ? ")
        if (warning){
            deleteNote(id, element)
        }
    })

    element.addEventListener("input",()=>{
        updateNote(id, element.value)
    })
    return element
}

function updateNote(id, content){
    const notes = getNotes()
    const target = notes.filter((note)=>note.id == id)[0];
    target.content=content
    saveNote(notes)

}

function deleteNote(id, element ){
    const notes = getNotes().filter((note=>note.id != id))
    saveNote(notes)
    appEL.removeChild(element)

}
function addNote(){
    const notes = getNotes()
    const noteObj = {
        id: Math.floor(Math.random()*10000),
        content :"",
    }
    const noteEl = createNoteEl(noteObj.id,noteObj.content);
    appEL.insertBefore(noteEl,btnEL)
    notes.push(noteObj)
    saveNote(notes)

}
function saveNote(note){
    localStorage.setItem("note-app",JSON.stringify(note))

}
function getNotes(){
   return  JSON.parse(localStorage.getItem("note-app") || "[]")
}

btnEL.addEventListener("click",addNote)