// Get all the functions we need from the SDK
const auth = firebase.auth();

// Get the HTML elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');

// --- Sign Up Button (THIS IS THE NEW PART) ---
btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    // Use the Firebase function to create a new user
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed up successfully!
            console.log('User created:', userCredential.user);
            alert('User created! You are now logged in.');
            
            // Send them to the main app
            window.location.href = '/index.html';
        })
        .catch(error => {
            // Handle errors (like email already in use)
            console.error('Signup Error:', error.message);
            alert('Error: ' + error.message);
        });
});

// --- Log In Button (This was already here) ---
btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    // Use the Firebase function to sign in
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Logged in successfully!
            console.log('User logged in:', userCredential.user);
            alert('Login successful!');

            // Send them to the main app
            window.location.href = '/index.html';
        })
        .catch(error => {
            // Handle errors (like wrong password)
            console.error('Login Error:', error.message);
            alert('Error: ' + error.message);
        });
});