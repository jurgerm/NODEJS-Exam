document.forms[0].addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(exam_port + "/v1/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: e.target.elements[0].value,
      password: e.target.elements[1].value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.location = 'groups.html';
        return;
      } else {
        alert(data.err || 'Something went wrong. Please check.');
      }
    })
    .catch((err) => alert(err.message));
});
