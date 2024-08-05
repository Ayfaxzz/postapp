let form = document.querySelector(".signup-form")
let loginForm = document.querySelector(".login-form")


if(form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
    
        try {
            const formData = new FormData (e.target)
            let res = await fetch("https://webstar-app.onrender.com/api/signup", {method: "post", body:formData})
            let data = await res.json()
            console.log(data);
            alert(data.message)
            localStorage.setItem("token", JSON.stringify(data.token))
            localStorage.setItem("profile", JSON.stringify(data.user))
            if(data.message == "Signup successfully!") {
                window.location.replace("./index.html")
            } 
        } catch (error) {
            console.log(error);
        }
    })

}
if(loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()
    
        try {
            const formData = new FormData (e.target)
            let res = await fetch("https://webstar-app.onrender.com/api/login", {method: "post", body:formData})

            let data = await res.json()

            alert(data.message)
            localStorage.setItem("token", JSON.stringify(data.token))
            localStorage.setItem("profile", JSON.stringify(data.user))
            if(data.message == "Login successfully!") {
                window.location.replace("./index.html")
            } 
        } catch (error) {
            console.log(error);
        }
    })

}