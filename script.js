const form = document.querySelector("#form");
const amount = document.querySelector("#amount");
const desc = document.querySelector("#desc");
const category = document.querySelector("#category");
const itemList = document.querySelector("#items-list");
const expenseBtn = document.querySelector("#subBtn");

let axiosAPI = "http://localhost:8000";

// Edit Button
function editButton(obj) {
  const edtExpsBtn = document.createElement("button");
  edtExpsBtn.className = "edt-btn";
  edtExpsBtn.appendChild(document.createTextNode("Edit"));
  edtExpsBtn.addEventListener("click", (e) => editLi(obj, e));

  async function editLi(obj, id, e) {
    // let userDetail = await axios.get(axiosAPI);
    // let user = userDetail.data.find((d) => {
    //   return d.amount === obj.amount && d.desc === obj.desc;
    // });
    amount.value = obj.amount;
    desc.value = obj.desc;
    category.value = obj.category;

    await axios.delete(`${axiosAPI}/expense/delete-expense/${id}`);
    let li = e.target.parentElement;
    itemList.removeChild(li);
  }
  return edtExpsBtn;
}

// Delete Button
function deleteBtn(obj) {
  const delExpsBtn = document.createElement("button");
  delExpsBtn.className = "del-btn";
  delExpsBtn.appendChild(document.createTextNode("Delete"));

  delExpsBtn.addEventListener("click", (e) => deleteLi(obj, e));

  async function deleteLi(id, e) {
    // const userDetail = await axios.delete(`${axiosAPI}/expense/delete-expense/${id}`);
    // const user = userDetail.data.find((d) => {
    //   return d.amount === obj.amount && d.desc === obj.desc;
    // });
    await axios
      .delete(`${axiosAPI}/expense/delete-expense/${id}`)
      .then((eid) => {
        const data = eid;
        AllUsersOnScreen();
      });
    let li = e.target.parentElement;
    itemList.removeChild(li);
  }
  return delExpsBtn;
}

// li Element
async function li(obj) {
  const li = document.createElement("li");
  li.className = "item";
  li.appendChild(await deleteBtn(obj));
  li.appendChild(await editButton(obj));
  li.appendChild(
    document.createTextNode(`${obj.amount} ${obj.desc} ${obj.category}`)
  );
  itemList.appendChild(li);
}

// form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    amount: amount.value,
    desc: desc.value,
    category: category.value,
  };
  // const userDetail = await axios.post(`${axiosAPI}/expense/add-expense`);
  // console.log(userDetail);
  // const user = userDetail.data.find(
  //   (d) => d.amount === obj.amount && d.desc === obj.desc
  // );
  axios
    .post(`${axiosAPI}/expense/add-expense`, obj)
    .then(() => {
      li();
    })
    .catch((err) => {
      console.log(err);
    });

  // if (!user) {
  //   li(obj);
  // } else {
  //   alert("User already existed");
  // }

  // await axios.post(`${axiosAPI}`, obj);
});

/// All Users On Screen
window.addEventListener("DOMContentLoaded", AllUsersOnScreen);

function AllUsersOnScreen() {
  let url = `${axiosAPI}/expense/get-expense`;
  axios.get(url).then((res) => {
    let { allUsers } = res.data;

    if (allUsers.length !== 0) li({});

    for (let i = 0; i < res.data.length; i++) {
      li(res.data[i]);
    }
  });
}
