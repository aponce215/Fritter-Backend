/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */


function getProfile(fields) {
    fetch(`/api/profile?author=${fields.author}`)
      .then(showResponse)
      .catch(showResponse);
}

function getMyProfile(fields) {
    fetch(`/api/profile/myProfile`)
      .then(showResponse)
      .catch(showResponse);
  }

function updateProfile(fields) {
    fetch(`/api/profile/`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }


function showBirthdayProfile(fields) {
  fetch(`/api/profile/showBirthday`, {method: 'PUT', headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function hideBirthdayProfile(fields) {
    fetch(`/api/profile/hideBirthday`, {method: 'PUT', headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }