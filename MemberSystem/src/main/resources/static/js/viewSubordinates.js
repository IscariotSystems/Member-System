let subordinates;

function clickPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const searchedSubordinate = document.getElementById('searchSubordinate').value;
        clearSubordinateDetails();
        displaySubordinateDetailsBySearch(searchedSubordinate);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displaySubordinateDetails();
        setupSearchEventListener(); 
    } catch (error) {
        console.error(error);
    }
});

async function displaySubordinateDetails() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in local storage.');
        }

        const urlNeeded = `/api/v1/user/${userId}/all`;

        const response = await fetch(urlNeeded);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        subordinates = await response.json();

        subordinates.forEach(addSubordinate);
    } catch (error) {
        console.error(error);
    }
}

function addSubordinate(subordinate) {
    const subordinateBox = document.createElement('div');
    subordinateBox.classList.add('subordinate-box');

    const subordinateName = document.createElement('div');
    subordinateName.classList.add('subordinate-name');

    const link = document.createElement('a');
    link.classList.add('single-subordinate-link');
    link.setAttribute('href', `viewSingleSubordinate.html?userId=${subordinate.userId}`);
    link.textContent = `${subordinate.firstName} ${subordinate.lastName} ${subordinate.userId}`;

    subordinateName.appendChild(link);

    const subordinateInnerBox = document.createElement('div');
    subordinateInnerBox.classList.add('subordinate-innerbox');

    const subordinateInnerStart = document.createElement('div');
    subordinateInnerStart.classList.add('subordinate-innerstart');

    let branchName = 'Not Available';
    let rankName = 'Not Available';

    if (subordinate.localBranch && subordinate.localBranch.name) {
        branchName = subordinate.localBranch.name;
    }

    if (subordinate.rank && subordinate.rank.name) {
        rankName = subordinate.rank.name;
    }

    const startUl = document.createElement('ul');
    startUl.innerHTML = `
        <li>Branch</li>
        <li>Rank</li>
        <li>Email</li>
    `;

    subordinateInnerStart.appendChild(startUl);

    const subordinateInnerEnd = document.createElement('div');
    subordinateInnerEnd.classList.add('subordinate-innerend');

    const endUl = document.createElement('ul');
    endUl.innerHTML = `
        <li>${branchName}</li>
        <li>${rankName}</li>
        <li>${subordinate.email}</li>
    `;

    subordinateInnerEnd.appendChild(endUl);

    const bottomTag = document.createElement('div');
    bottomTag.classList.add('bottom-tag');

    subordinateBox.appendChild(subordinateName);
    subordinateBox.appendChild(subordinateInnerBox);
    subordinateInnerBox.appendChild(subordinateInnerStart);
    subordinateInnerBox.appendChild(subordinateInnerEnd);
    subordinateBox.appendChild(bottomTag);

    const parentElement = document.querySelector('.content-subordinate-container');
    parentElement.appendChild(subordinateBox);
}


function setupSearchEventListener() {
    document.getElementById('searchSubordinate').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchedSubordinate = this.value;
            clearSubordinateDetails();
            displaySubordinateDetailsBySearch(searchedSubordinate);
        }
    });
}

function clearSubordinateDetails() {
    var element = document.getElementById('viewSubordinatesDynam');
    element.innerHTML = ''; 
}

function displaySubordinateDetailsBySearch(searchedSubordinate) {
    subordinates.forEach(function (subordinate) {
        if ((subordinate.firstName.toLowerCase().includes(searchedSubordinate.toLowerCase())) || 
        (subordinate.lastName.toLowerCase().includes(searchedSubordinate.toLowerCase())) ||
        (`${subordinate.firstName} ${subordinate.lastName}`.toLowerCase().includes(searchedSubordinate.toLowerCase()))) {
        addSubordinate(subordinate);
        } 
    });
}
