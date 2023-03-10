function testlogin() {

    const form = document.getElementById('Login')
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log()
            const data = {
                email: event.target.user_email.value,
                password: event.target.user_password.value
            };
            fetch('http://localhost:5678/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {


                    if (data.userId) {
                        sessionStorage.setItem("token", data.token);
                        window.location.assign('./')
                        console.log(data)

                    } else {
                        alert(" Email ou mot de passe  non valide.")
                    }

                })
                .catch(error => {
                    console.log('Error:', error);
                });
        })



    }
}
testlogin()
let key = sessionStorage.getItem('token')
console.log(key)

