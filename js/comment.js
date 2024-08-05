let commentInput = document.querySelector(".comment-input")
let commentForm = document.querySelector(".comment-form")
let commentBox = document.querySelector(".comment-box")

let postId = localStorage.getItem('postId')
let token = JSON.parse(localStorage.getItem("token"))
let userId = JSON.parse(localStorage.getItem("profile"))._id

let getComments = async () => {
    try {
        const res = await fetch(`https://webstar-app.onrender.com/api/post/${postId}`)
        let data = await res.json()
        let comments = data[0].comments


        let result = ""
        comments.forEach(comment => {
            result = result + `
            <span class="comment">${comment.content} 
            <p>${comment.author[0].name} ${comment.author[0].surname}   ${userId == comment.authorId ? `<button onclick="delComments('${comment._id}')" class="btn btn-danger del-btn">Delete</button>` : ``}</p></span>`
        });
        commentBox.innerHTML = result
    } catch (error) {
        console.log(error);
    }
}

getComments()

commentForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        let create = document.querySelector(".create-btn")
        create.innerHTML = `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      </button>`
        const formData = new FormData(e.target)
        formData.append("postId", postId)
        const res = await fetch("https://webstar-app.onrender.com/api/comment",
        {body: formData, method: "post", headers: {access_token: token}})
        const data = await res.json()
        commentInput.value = ""
        create.innerHTML = `<button class="btn d-block btn-primary ms-auto create-btn">Create comment</button>`
        getComments()
        alert(data.message)
    } catch (error) {
        console.log(error);
    }
})


let delComments = async (id) => {
    try {
        let delBtn = document.querySelector(".del-btn")
        delBtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const res = await fetch(`https://webstar-app.onrender.com/api/comment/${id}`, {method: "delete", headers: {access_token: token}})
        let data = await res.json()
        console.log(data);
        getComments()
    } catch (error) {
        console.log(error);
    }
}