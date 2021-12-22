//Groups list
function loadGroups() {
  fetch(exam_port + "/v1/accounts/", {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')} `,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        displayGroups(data);
      } else {
        alert(data.err || 'Something went wrong');
      }
    })
    .catch((err) => alert(err.message));
}

function displayGroups(groups) {
  const groupList = document.querySelector('.groups-list');
  groupList.innerHTML = '';
  groups.forEach((group) => {
    const groupElement = document.createElement('div');
    groupElement.classList = 'group-element';

    const groupId = document.createElement('div');
    groupId.textContent = `ID: ${group.group_id}`;
    groupId.classList = 'group-id';
    groupElement.appendChild(groupId);

    const groupName = document.createElement('div');
    groupName.textContent = group.name;
    groupName.classList = 'group-name';
    groupElement.appendChild(groupName);

    groupList.appendChild(groupElement);
    groupElement.addEventListener('click', (e) => {
      document.location = `bills.html?group=${group.group_id}`;
    });
  });
}
loadGroups();

//Add new group

document.getElementById('add-new-group').addEventListener('submit', (e) => {
  e.preventDefault();
  const groupId = document.getElementById('group-id').value;
  const data = { group_id: groupId };
  fetch(exam_port + "/v1/accounts", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')} `,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        alert(data.err);
      }
    })
    .then(() => loadGroups())
    .catch((err) => alert(err.message));
});
