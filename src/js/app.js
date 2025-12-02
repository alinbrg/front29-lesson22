const addNewUserBtn = document.getElementById("addNewUser");
const userFormDialog = document.getElementById("userFormDialog");

try {
	addNewUserBtn.addEventListener("click", () => {
		userFormDialog.showModal();
	});

	userFormDialog.querySelector("#close").addEventListener("click", () => {
		userFormDialog.close();
	});
} catch (err) {
	console.log("Element not found: ", err);
} finally {
	// console.log("User form dialog script executed");
}

function getAllCountries() {
	fetch("https://restcountries.com/v3.1/all?fields=name,flags")
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			console.log(
				result.find((country) => country.name.official === "Georgia")
			);
		})
		.catch((err) => {
			console.log("error message: ", err);
		})
		.finally(() => {
			console.log("fetch attempt finished");
		});
}

async function getAllCountriesAsync() {
	try {
		const respone = await fetch("https://borjomi.loremipsum.ge/api/all-users");

		const data = await respone.json();

		// console.log(data.users);

		// render all users in html
	} catch (err) {
		console.log("error message: ", err);
	} finally {
		// console.log("fetch attempt finished");
	}
}

getAllCountriesAsync();

// new Promise((resolve, reject) => {
// 	const success = false;

// 	if (success) {
// 		resolve("The promise was resolved successfully.");
// 	} else {
// 		reject("The promise was rejected.");
// 	}
// })
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/120 ", //id, method  GET
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/145 ", //id, method PUT  ყველა ველი სავალდებულო
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/145"; //id, method DELETE

const regForm = document.querySelector("#registration-form"),
	userName = regForm.querySelector("#userName"),
	userSurname = regForm.querySelector("#userSurname"),
	userEmail = regForm.querySelector("#userEmail"),
	userPhone = regForm.querySelector("#userPhone"),
	userPersonalID = regForm.querySelector("#userPersonalId"),
	userZip = regForm.querySelector("#userZipCode"),
	userGender = regForm.querySelector("[name='gender']:checked");

const dataExample = {
	first_name: "test1234",
	last_name: "test1234",
	phone: "123456789",
	id_number: "12345678909",
	email: "test@gmail.com",
	gender: "female",
	zip_code: "1245",
};

function createNewUser(userData) {
	fetch("https://borjomi.loremipsum.ge/api/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			// console.log("User created successfully: ", result);

			regForm.reset();
			userFormDialog.close();

			getAllCountriesAsync();
		})
		.catch((err) => {
			console.error("Error creating user: ", err);
		})
		.finally(() => {
			// console.log("Create user request finished");
		});
}

function deleteUser(id) {
	fetch(`https://borjomi.loremipsum.ge/api/delete-user/${id}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			// console.log("User deleted successfully: ", data);
			getAllCountriesAsync();
		})
		.catch((err) => {
			console.error("Error deleting user: ", err);
		});
}

regForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (true) {
		const userData = {
			first_name: userName.value,
			last_name: userSurname.value,
			phone: userPhone.value,
			id_number: userPersonalID.value,
			email: userEmail.value,
			gender: regForm.querySelector("[name='gender']:checked").value,
			zip_code: userZip.value,
		};
		createNewUser(userData);
	}
});
