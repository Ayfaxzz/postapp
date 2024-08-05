let authorName = document.querySelector(".author-name")
let addPostForm = document.querySelector(".add-post-form")
let myPosts = document.querySelector(".my-posts")
let loading = false

if(profile) {
    authorName.textContent = "Salom, bu yerda faqat " + profile.name + "ning postlari"
}

// let token = JSON.parse(localStorage.getItem("token"))


let getUsersPosts = async () => {
    try {
        const res = await fetch("https://webstar-app.onrender.com/api/my",
        {headers: {"access_token": token}})
        const posts = await res.json()

        let result = ``
        posts.reverse().forEach(post => {
            result = result + `
            <div class="col-12 col-md-4 col-lg-3 p-2">
                    <div class="card" style="width: 18rem;">
                        <img src="${post.image.url}" class="card-img-top img-fluid" height="200" alt="post_img">
                        <div class="card-body">
                          <h5 class="card-title text-truncate">${post.title}</h5>
                          <p class="card-text text-truncate">${post.content}</p>
                          <a href="./post.html" class="btn btn-primary" onclick="saveMyPostId('${post._id}')">Read more</a>
                            <button class="btn btn-danger mx-2 del-btn" onclick="delUsersPosts('${post._id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                            </svg>
                            </button>
                          <span class="btn btn-outline-primary ms-3 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg> ${post.views} </span>
                        </div>
                      </div>
                </div>`
        });
        if(myPosts) {
            myPosts.innerHTML = result

        }
    } catch (error) {
        console.log(error);
    }
}

getUsersPosts()

let spinner = document.querySelector("#spinner")

if(addPostForm) {
    addPostForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let spin = document.createElement("div")
        spin.innerHTML =`<div class="spinner-border text-primary" id="spin" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
      spinner.append(spin)
        try {
            const res = await fetch("https://webstar-app.onrender.com/api/post",
            {method: "post", body: formData, headers: {"access_token": token}})

            let data = await res.json()
            console.log(data);
            e.target.reset()
            getUsersPosts()
            spin.remove()

            
        } catch (error) {
            console.log(error);
        }
    })
}

    

let delUsersPosts = async (postId) => {
    try {
        alert("Wait...")
        const res = await fetch(`https://webstar-app.onrender.com/api/post/${postId}`,
        {method: "delete", headers: {access_token: token}})
        const data = await res.json()
        alert(data.message)
        getUsersPosts()

    } catch (error) {
        console.log(error);
    }
}

let saveMyPostId = (postId) => {
    localStorage.setItem("postId", postId)
}