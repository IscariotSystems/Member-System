document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displayAccountDetails();
    } catch (error) {
        console.error(error);
    }
});

async function displayAccountDetails() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in local storage.');
        }

        const urlNeeded = '/api/v1/user/' + userId;
        const response = await fetch(urlNeeded);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        const userOBJ = await response.json();

        const {
            branchId,
            superiorId,
            rankId,
            invitationDate,
            email,
            phoneNumber,
            address,
            socialScore,
            firstName,
            lastName
        } = userOBJ;

        document.querySelector('.user-name').textContent = `${firstName} ${lastName}`;
        document.querySelector('.user-id').textContent = userId;
        document.querySelector('.user-branch').textContent = branchId;
        document.querySelector('.user-phone-number').textContent = phoneNumber;
        document.querySelector('.user-address').textContent = address;
        document.querySelector('.user-email').textContent = email;
        document.querySelector('.user-superior').textContent = `Superior: ${superiorId}`;
        document.querySelector('.user-amnesty-days').textContent = `Amnesty Days: ${invitationDate}`;
        document.querySelector('.user-standing').textContent = `Standing: ${rankId}`;
        document.querySelector('.user-social-score').textContent = `Social Score: ${socialScore}`;
    } catch (error) {
        throw new Error(error.message);
    }
}