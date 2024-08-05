let checkAuthLink = document.querySelector(".check-auth-link")
let username = document.querySelector(".username")
let lastPosts = document.querySelector(".last-posts")
let allPosts = document.querySelector(".all-posts")
let searchForm = document.querySelector(".search-form")
let searchInput = document.querySelector(".search-inp")
let token = JSON.parse(localStorage.getItem("token"))

let profile = JSON.parse(localStorage.getItem("profile"))

if(lastPosts) {
    lastPosts.innerHTML = `<img src="./img/200ц.gif" class="img-fluid mx-auto my-5 d-block" alt="loader">`
}

if (profile) {
    checkAuthLink.innerHTML =  `
    <a class="nav-link" onclick="exit()" href="./login.html">Log out</a>`

    username.textContent = profile.name
} else {
    username.remove()
}

let exit = () => {
    localStorage.clear()
}



let getPosts = async () => {
    try {
        const res = await fetch("https://webstar-app.onrender.com/api/post", {headers: {access_token: token}})
        let posts = await res.json()
        
        if(lastPosts) {
            let result = ``
        posts.reverse().slice(0, 4).forEach(post => {
            result = result + `
            <div class="col-12 col-md-4 col-lg-3 p-2">
            <div class="card" style="width: 230px; max-height: 400px; margin-bottom: 10px;">
            <img src="${post.image.url}" class="card-img-topd" height="200" alt="post_img">
            <div class="card-body">
            <h5 class="card-title text-truncate">${post.title}</h5>
            <p class="card-text text-truncate">${post.content}</p>
            <a href="./post.html" class="btn btn-primary" onclick="savePostId('${post._id}')">Read more</a>
            <span class="btn btn-outline-primary ms-3 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg> ${post.views} </span>
            </div>
            </div>
            </div>`
            lastPosts.innerHTML = result
        });
        }
        if(allPosts) {
            let result = ``
        posts.reverse().forEach(post => {
            result = result + `
            <div class="col-12 col-md-4 col-lg-3 p-2">
            <div class="card" style="width: 230px; max-height: 400px; margin-bottom: 10px;">
            <img src="${post.image.url}" class="card-img-top" height="200px" alt="post_img">
            <div class="card-body">
            <h5 class="card-title text-truncate">${post.title}</h5>
            <p class="card-text text-truncate">${post.content}</p>
            <a href="./post.html" class="btn btn-primary" onclick="savePostId('${post._id}')">Read more</a>
            <span class="btn btn-outline-primary ms-3 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg> ${post.views} </span>
            </div>
            </div>
            </div>`
            allPosts.innerHTML = result
        });
        }
        
       
       
    } catch (error) {
        console.log(error);
    }
}

getPosts()


let savePostId = (postId) => {
    localStorage.setItem("postId", postId)
}
if(searchForm) {
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        try {
            let title = searchInput.value
            const res = await fetch(`https://webstar-app.onrender.com/api/search?title=${title}`, {headers: {access_token: token}});
            let posts = await res.json()
            let result = ``
            if(lastPosts) {
                posts = posts.slice(0, 4)
            }
            posts.forEach(post => {
                result = result + `
                <div class="col-12 col-md-4 col-lg-3 p-2">
                        <div class="card" style="width: 230px; max-height: 400px; margin-bottom: 10px;">
                            <img src="${post.image.url}" class="card-img-top img-fluid" height="200" alt="post_img">
                            <div class="card-body">
                              <h5 class="card-title text-truncate">${post.title}</h5>
                              <p class="card-text text-truncate">${post.content}</p>
                              <a href="./post.html" class="btn btn-primary" onclick="savePostId('${post._id}')">Read more</a>
                              <span class="btn btn-outline-primary ms-3 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg> ${post.views} </span>
                            </div>
                          </div>
                    </div>`
            });
            if(allPosts) {
                allPosts.innerHTML = result
            }
        } catch (error) {
            console.log(error);
        }
    })

}

