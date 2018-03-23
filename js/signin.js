(function(){
	// Get elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	// Add login event
	btnLogin.addEventListener('click', e => {
		// Get email and pass
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email,pass);
		promise.catch(e => document.getElementById('errorBlock').innerHTML = e.message);
	});

	// Add signup event
	btnSignUp.addEventListener('click', e => {
		// Get email and pass
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => document.getElementById('errorBlock').innerHTML = e.message);
	});

	// Add Log out event
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log(firebaseUser);
			Materialize.toast('User logged in successfully.', 5000);
			btnLogout.classList.remove('disabled');
		}
		else {
			console.log('Not logged in');
			Materialize.toast('No user logged in.', 5000);
			btnLogout.classList.add('disabled');
		}
	});


}());
