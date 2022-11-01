/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

//  'get-benevolence': getBenevolence,
//  'report-benevolence': reportBenevolence,
//  'nominate-benevolence': nominateBenevolence,

function getBenevolence(fields) {
  fetch(`/api/benevolence?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}
  

function getMyBenevolence(fields) {
    fetch(`/api/benevolence/myBenevolence`)
      .then(showResponse)
      .catch(showResponse);
  }

function reportBenevolence(fields) {
    fetch('/api/benevolence/report', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}
  
function nominateBenevolence(fields) {
  fetch('/api/benevolence/nominate', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}