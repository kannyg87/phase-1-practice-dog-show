
document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('table');
  const form = document.getElementById('dog-form');
  const inputs = form.querySelectorAll('input');

  const nameInput = inputs[0];
  const breedInput = inputs[1];
  const sexInput = inputs[2];

  let selectedDog = {};

  fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
      data.forEach(element => {
        const row = document.createElement('tr');
        const btn = document.createElement('button');
        btn.textContent = 'Edit Dog';

        row.innerHTML = `
          <td>${element.name}</td>
          <td>${element.breed}</td>
          <td>${element.sex}</td>
        `;
        
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          nameInput.value = element.name;
          breedInput.value = element.breed;
          sexInput.value = element.sex;

          selectedDog = {
            id: element.id,
            name: element.name,
            breed: element.breed,
            sex: element.sex
          };
        });

        row.appendChild(btn);
        table.appendChild(row);
      });
    });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    selectedDog.name = nameInput.value;
    selectedDog.breed = breedInput.value;
    selectedDog.sex = sexInput.value;

    // Fetch the updated data to the server
    fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(selectedDog)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  });
});


