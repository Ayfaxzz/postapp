let postId = localStorage.getItem("postId")
let postBox = document.querySelector(".post-box")

// let token = JSON.parse(localStorage.getItem("token"))

let getPost = async () => {
    try {
        const res = await fetch(`https://webstar-app.onrender.com/api/post/${postId}`)
        let data = await res.json()
        let post = data[0]

        postBox.innerHTML = `<img src="${post.image.url}" alt="post_img" class="img-fluid rounded d-block mx-auto">
        <h2 class="text-center text-success my-4 text-white fs-1">${post.title}</h2>
        <p class="text-center text-white fs-3">${post.content}</p>
        <figure class="text-end">
            <blockquote class="blockquote">
              <p class="text-white fs-2">${post.author[0].name} ${post.author[0].surname}</p>
            </blockquote>
          </figure>

          <div class="d-flex gap-2">
            <button class="like btn btn-primary" onclick="likePost()">Likes ${post.like.length}</button>
            <button class="dislike btn btn-danger" onclick="dislikePost()">Dislikes ${post.dislike.length}</button>
            <a href="./comments.html" class="comments btn btn-info">Comments ${post.comments.length}</a>
            <button class="btn btn-info text-white">${post.createdAt.slice(0, 10)}</button>
          </div>
        </div>`
        
    } catch (error) {
        console.log(error);
    }
}

getPost()



let likePost = async () => {
    try {
        let likeBtn = document.querySelector(".like")
        likeBtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const res = await fetch(`https://webstar-app.onrender.com/api/like/${postId}`,
        {headers: {access_token: token}})
        const data = await res.json()
        getPost()
    } catch (error) {
        console.log(error);
    }
}
let dislikePost = async () => {
    try {
        let disBtn = document.querySelector(".dislike")
        disBtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const res = await fetch(`https://webstar-app.onrender.com/api/dislike/${postId}`,
        {headers: {access_token: token}})
        const data = await res.json()
        getPost()
    } catch (error) {
        console.log(error);
    }
}

 


