//Add new bill in to group
document.getElementById('add-new-bill').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    amount: e.target.amount.value,
    description: e.target.description.value,
    group_id: getGroupId(),
  };
  fetch(exam_port + "/v1/bills", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Failed request with status ${res.status}`);
      }
    })
    .then(() => {
      document.location.reload();
    })
    .catch((err) => console.log(err));
});

function getGroupId() {
  return document.location.search.slice(7);
}

function loadBills() {
  const groupId = getGroupId();
  fetch(exam_port + `/v1/bills/${groupId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')} `,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        displayBills(data);
      } else {
        alert(data.err || 'Something went wrong');
      }
    })
    .catch((err) => alert(err.message));
}

loadBills();

// Show all bills
function displayBills(bills) {
  const billsList = document.querySelector('.user-bills tbody');
  bills.forEach((bill) => {
    const billElement = document.createElement('tr');

    const billId = document.createElement('td');
    billId.textContent = bill.id;
    billElement.appendChild(billId);

    const billDescr = document.createElement('td');
    billDescr.textContent = bill.description;
    billElement.appendChild(billDescr);

    const billAmount = document.createElement('td');
    billAmount.textContent = `$ ${bill.amount}`;
    billElement.appendChild(billAmount);

    billsList.appendChild(billElement);
  });
}
