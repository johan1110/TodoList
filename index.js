const elForm = document.querySelector(".form")
const elFormInput = elForm.querySelector(".form__input")
const elList = document.querySelector(".list")
const elTemplete = document.querySelector(".templett").content



let todosArr = []

const complatedTodo = (e) => {
    let dataId = e.target.dataset.id

    let foundCheck = todosArr.find(item => item.id == dataId)

    foundCheck.isCompleted = !foundCheck.isCompleted

    
    renderTodos(todosArr, elList)
}

const editetTodo = (e) => {
    let dataId = e.target.dataset.id

    let foundEdit = todosArr.find(item => item.id == dataId)

    foundEdit.content = prompt("Yangi element kiriting")

    renderTodos(todosArr, elList)
}

const deleteTodo = (e) => {
    let dataId = e.target.dataset.id

    let foundIndex = todosArr.find(item => item.id == dataId)

    todosArr.splice(foundIndex, 1)

    renderTodos(todosArr, elList)
}


function renderTodos(arr, list){
   list.innerHTML = null
    arr.map((item) => {
      let cloneTemplate = elTemplete.cloneNode(true)

      let listItemContend = cloneTemplate.querySelector(".content");
      let listItemDelet = cloneTemplate.querySelector(".list__item-delete")
      let listItemEdit = cloneTemplate.querySelector(".list__item-edit")
      let listItemCheck = cloneTemplate.querySelector(".list__item-check")


      listItemContend.textContent = item.content
      listItemDelet.dataset.id = item.id
      listItemEdit.dataset.id = item.id
      listItemCheck.dataset.id = item.id

      if(item.isCompleted == true){
        listItemCheck.checked = true
        listItemContend.style = "text-decoration:line-through ; color: gray;"
      }


      listItemDelet.addEventListener("click", deleteTodo)
      listItemEdit.addEventListener("click", editetTodo)
      listItemCheck.addEventListener("change", complatedTodo)

      elList.appendChild(cloneTemplate)
    })


}

renderTodos(todosArr, elList)


elForm.addEventListener("submit", e => {
    e.preventDefault()
    let inputValue = elFormInput.value.trim()

    todosArr.push({
        id: new Date().getMilliseconds(),
        content: inputValue,
        isCompleted: false,
    })


    renderTodos(todosArr, elList)

    elFormInput.value = null
    elFormInput.focus()
})

