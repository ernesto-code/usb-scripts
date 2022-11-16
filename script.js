// Filter Layout
const targetElement = document.querySelector("#issueListTitle")
const newItem = document.createElement("div")
const itemsAmount = document.getElementsByTagName("table")[0].nextElementSibling

let checkbox = null
let selectComponent = null
var index;

newItem.style.padding = "1em"
newItem.style.outline = "rgb(6, 107, 177) 1px solid"

// Layout set and adding to DOM
newItem.innerHTML = 
    `<select id="select-component">
        <option disabled selected>Select a component</option>
        <option value='Smart'>Smart Assistant</option>
        <option value='Auth'>Auth Preferences</option>
        <option value='Marketplace'>Marketplace</option>
        <option value='Bank'>Bank Brand Card Apply</option>
    </select>
    <button id='clear-button'>Clear</button>
    <label style="display:inline;margin-left:3em;">
    <input type="checkbox" id="bold-text-checkbox" style="display:inline;"> Bolded titles</label>
    `
targetElement.insertAdjacentElement("afterend",newItem)




// Event listeners adding
setTimeout(()=>{
    checkbox = document.querySelector("#bold-text-checkbox")
    selectComponent = document.querySelector("#select-component")
    clearButton = document.querySelector("#clear-button")

    let obtenerDato = document.getElementsByTagName("td");
    let tableRows =   document.getElementsByTagName("tr");
    var tdArray = Array.prototype.slice.call(document.getElementsByTagName("td"))

    // Bolded text
    checkbox.addEventListener('click',()=>{
        var first;
        var second;
        let title = ''
        let titleDesc =''
        let arrTitle =[]
        for (index = 0; index < obtenerDato.length; index++ ){    
                if(obtenerDato[index].getAttribute('data-column-title')=='Title '){
                    first= obtenerDato[index].childNodes;    
                    second = first[3].childNodes; 
                    title = second[2].innerHTML
                    arrTitle = title.split('/')
                    if(checkbox.checked)
                        titleDesc = '<b>'+ arrTitle[arrTitle.length -1]+'</b>'
                    else
                        titleDesc = arrTitle[arrTitle.length -1]
                    arrTitle.pop()
                    arrTitle.push(titleDesc)
                    second[2].innerHTML = arrTitle.join('/')
                }
        }
        
    }),500

    clearButton.addEventListener('click',()=>{
        // Showing all issues
        console.log('showing ....')
        for (index = 1; index < tableRows.length; index++ ){    
            tableRows[index].style.display = 'table-row'
        }

    })
 // Display issues per selected component


    // Filter by components
    selectComponent.addEventListener('change',(event)=>{
        const selectElement = event.target
        let comps = []
        let title = null
        let comp = null
        let issuesCount = 0
        let selectedComp = selectElement.options[selectElement.selectedIndex].text
        let selectedValue = selectElement.value
        console.log(selectedComp)
        console.log(selectedValue)

        // Current components
        /*for (index = 1; index < tableRows.length; index++ ){    
            title = tableRows[index].children[1].children[0].children[0].innerText
            comp = title.substring(0,title.indexOf('/',0))
            if(comps.indexOf(comp) == -1) 
                comps.push(comp)
        }
        */
        for (index = 1; index < tableRows.length; index++ ){    
            title = tableRows[index].children[1].children[0].children[0].innerText
            if(!title.includes(selectedValue))
                tableRows[index].style.display = 'none'   
            else 
                issuesCount++
        }
        itemsAmount.innerHTML = 'Showing '+issuesCount+' for <b>'+ selectedComp + '</b> component.'
    })




})




