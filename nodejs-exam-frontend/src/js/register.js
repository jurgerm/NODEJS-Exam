document.getElementById('add-new-user').addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repeatedPassword = document.getElementById('repeat-password').value;
  if (password !== repeatedPassword) {
    alert('Password repeated incorrectly');
    return;
  }

  const userRegistrationData = { fullName, email, password };
  console.log(userRegistrationData);
  fetch("http://localhost:8080/v1/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userRegistrationData),
  })
    .then(
      (res) => {
        console.log('res.status', res.status);
        return res.json();
      }
    )
    .then((responseData2) => {
      console.log('responseData2', responseData2);
      if (responseData2.error) {
        if (responseData2.error == 'Email already exists') {
          alert('Email already registered')
        }
        else {
          alert('Unknown error. Try again later.')
          console(responseData2.error);
        }
      } else {
        alert("GREAT SUCCESS");
        document.location = 'login.html';
      }
    }
    )
    .catch((error) => error);

});


