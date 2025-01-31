document.addEventListener("DOMContentLoaded", loadUsers);

function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    };
    axios
        .post(
            "https://crudcrud.com/api/4f6952e76d4d4355976a2f07f7f65f7f/appointmentData",
            userDetails
        )
        .then((response) => displayUserOnScreen(response.data))
        .catch((error) => console.log(error));

    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        axios
            .delete(`https://crudcrud.com/api/4f6952e76d4d4355976a2f07f7f65f7f/appointmentData/${userDetails._id}`)
            .then(() => {
                userList.removeChild(event.target.parentElement);
            })
            .catch((error) => console.log(error));
    });

    editBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
    });
}

function loadUsers() {
    axios
        .get("https://crudcrud.com/api/4f6952e76d4d4355976a2f07f7f65f7f/appointmentData")
        .then((response) => {
            response.data.forEach((user) => {
                displayUserOnScreen(user);
            });
        })
        .catch((error) => console.log(error));
}

document.getElementById("userForm").addEventListener("submit", handleFormSubmit);
