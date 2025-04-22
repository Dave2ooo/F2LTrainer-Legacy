const ELEM_FEEDBACK_FORM = document.getElementById("feedback-form");
const ELEM_FEEDBACK_RESULT = document.getElementById("feedback-result");

ELEM_FEEDBACK_FORM.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(ELEM_FEEDBACK_FORM);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    ELEM_FEEDBACK_RESULT.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
        })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            ELEM_FEEDBACK_RESULT.innerHTML = json.message;
        } else {
            console.log(response);
            ELEM_FEEDBACK_RESULT.innerHTML = json.message;
        }
    })
    .catch((error) => {
        console.log(error);
        ELEM_FEEDBACK_RESULT.innerHTML = "Something went wrong!";
    })
    .then(function () {
        ELEM_FEEDBACK_FORM.reset();
        // setTimeout(() => {
        // ELEM_FEEDBACK_RESULT.style.display = "none";
        // }, 3000);
    });
});
