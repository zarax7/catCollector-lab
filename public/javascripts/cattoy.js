const toyInputEl = document.querySelectorAll("#toyInput");
const toyNameEl = document.querySelectorAll("#toyName");
const submitBtn = document.querySelectorAll("#submit");

const toyInput = document.getElementById("toyInput");
const toyName = document.getElementById("toyName");
const submit = document.getElementById("submit");

// submitBtn.forEach((item) => {
//   item.addEventListener("click", function () {
//     toyNameEl.forEach(function (e) {
//       toyInputEl.value = e.target.value;
//     });
// toyInputEl.value = toyNameEl.value;
//   });
// });

// submitBtn.addEventListener("click", function () {
//   alert("hi");
// });
// submit.addEventListener("click", function () {
//   toyInput.value = toyName.value;
//   toyInput.textContent = toyName;
// });

function handleClick() {
  toyInput.value = toyName.value;
  toyInput.textContent = toyName.value;
}
