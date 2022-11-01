/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */


function getShareTime(fields) {
    fetch(`/api/shareTime?author=${fields.author}`)
      .then(showResponse)
      .catch(showResponse);
  }

function getMyShareTime(fields) {
  fetch(`/api/shareTime/myShareTime`)
    .then(showResponse)
    .catch(showResponse);
}