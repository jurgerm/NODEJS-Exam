function main() {
  const destination = localStorage.getItem('token')
    ? 'groups.html'
    : 'login.html';
  document.location = destination;
}

main();
