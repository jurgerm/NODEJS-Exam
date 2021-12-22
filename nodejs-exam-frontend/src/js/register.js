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

  const data = { fullName, email, password };
  fetch("http://localhost:8080/v1/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(
      () => {
        alert("GREAT SUCCESS");
        document.location = 'login.html';
      }
    )
    .catch((error) => error);

});
