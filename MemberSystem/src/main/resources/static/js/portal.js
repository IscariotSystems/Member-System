
document.addEventListener('DOMContentLoaded', function () {
    if (isTokenValid()){

        displayAccount();
        logoutEventListener();
    }
});

function isTokenValid(){

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken){
        return true; // CHANGE LATER
    }
    else{
        return true;
    }
}

function displayAccount(){

    const userId = localStorage.getItem('userId');
    const urlNeeded = `/api/v1/user/${userId}`;

    fetch(urlNeeded)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('There was a problem with the request.');
                }
            })
            .then(userOBJ => {
                const statementUpdater = userOBJ.firstName;
                document.getElementsByTagName('header')[0].innerHTML = `Welcome, ${statementUpdater}`;

                displayBranchIcon(userOBJ);
            })
            .catch(error => {
                alert(error.message);
            });
}

function logoutEventListener(){
    const logoutButton = document.querySelector(".log-out a");
    logoutButton.addEventListener("click", (event) => {
        logout();
    });
}

function logout() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token || refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    }

    window.location.href = 'index.html';
}

function displayBranchIcon(userOBJ) {

    if (!userOBJ || !userOBJ.rank) {
        return;
    }

    const rank = userOBJ.rank;

    const sidebar = document.querySelector('.sidebar');

    const element = sidebar.querySelector('.menu');

    const listElement = document.createElement('li');
    const anchorElement = document.createElement('a');
    const iconElement = document.createElement('i');
    const spanElement = document.createElement('span');

    anchorElement.href = 'branchPage.html';

    iconElement.className = 'fa-solid fa-person'; 

    spanElement.textContent = 'Branch';

    if (rank.rankId > 2) {
        anchorElement.href = 'exclusiveBranchPage.html';
    }

    anchorElement.appendChild(iconElement);
    anchorElement.appendChild(spanElement);

    listElement.appendChild(anchorElement);
    element.appendChild(listElement);
}

