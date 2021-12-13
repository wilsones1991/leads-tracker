//null is a useful way to make an object falsy
let myLeads = []

// const cannot be reassigned.
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveTabBtn = document.getElementById("save-tab")
const deleteBtn = document.getElementById("delete-btn")
const savedLeads = document.getElementById("saved-leads")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

/* Check if leadsFromLocalStorage is truthy. If so, set myLeads to its value and call render*/
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Process input box then submit url on click
inputBtn.addEventListener("click", sendInputText)

// Process input box then submit url on click
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendInputText()
    }
})

// Saves the tab in the tabs array. Will be more useful when we are calling active tab.
saveTabBtn.addEventListener("click", function() {
    // Add a line to get current tab from Chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        submitLeads(tabs[0].url)
    })
})

// Clear assets when double clicking delete button
deleteBtn.addEventListener("dblclick", function() {
    // // Clear localStorage
    localStorage.clear()
    // //Reset array
    myLeads = []
    // Clear the DOM
    render(myLeads)
})

function sendInputText() {
    if (inputEl.value) {
        submitLeads(inputEl.value)
        inputEl.value = ""
        inputEl.focus()
    }
}

function submitLeads (website) {
    myLeads.push(website)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
}

function render(leads) {
    let listItems = ""
        for (i=0; i<leads.length; i++) {
            // listItems +=  "<li><a href='" + leads[i] + "' target='_blank'>" + leads[i] + "</a></li>"
            // below is a template string which is WAY better for longer HTML strings
            listItems +=  `
                <li>
                    <a href='${leads[i]}' target='_blank'>
                        ${leads[i]}
                    </a>
                </li>
            `
        }
    savedLeads.innerHTML = listItems
}