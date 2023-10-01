fetch("https://backendchromeextention.onrender.com/upload", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    video: "Victoy icha",
    completed: false,
  }),
  headers: {
    "Content-type": "application/json; charset=utf-8",
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));

async function logUsers() {
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
  //   const users = await res.json();
  //   console.log(users);

  await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => console.log(data[0].name));
}

logUsers();

//   .then((res) => res.json())
//   .then((data) => console.log(data.title));
