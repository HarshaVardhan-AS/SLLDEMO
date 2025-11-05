// Get all the functions we need from the SDK
const auth = firebase.auth();

// Get the HTML elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');

// --- Sign Up Button ---
btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User created:', userCredential.user);
            alert('User created! You are now logged in.');
            
            // FIX: Changed to relative path
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Signup Error:', error.message);
            alert('Error: ' + error.message);
        });
});

// --- Log In Button ---
btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User logged in:', userCredential.user);
            alert('Login successful!');

            // FIX: Changed to relative path
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Login Error:', error.message);
            alert('Error: ' + error.message);
        });
});