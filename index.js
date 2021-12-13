//null is a useful way to make an object falsy
let myLeads = []

// const cannot be reassigned.
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const savedLeads = document.getElementById("saved-leads")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

// Trigger submit with click
inputBtn.addEventListener("click", submitLeads)

// Trigger submit with enter
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitLeads()
    }
})

function submitLeads () {
    if (inputEl.value !== "") {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        inputEl.focus()
        renderLeads()
        console.log(localStorage.getItem("myLeads"))
    }
}

function renderLeads() {
    let listItems = ""
        for (i=0; i<myLeads.length; i++) {
            // listItems +=  "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
            // below is a template string which is WAY better for longer HTML strings
            listItems +=  `
                <li>
                    <a href='${myLeads[i]}' target='_blank'>
                        ${myLeads[i]}
                    </a>
                </li>
            `
        }
    savedLeads.innerHTML = listItems
}