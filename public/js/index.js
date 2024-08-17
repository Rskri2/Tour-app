/* eslint-disable  */

import '@babel/polyfill';
import { displayMap } from './mailbox';
import { login, logout } from './login';
import { updateSettings } from './updateSetting';
import { bookTour } from './stripe';

//DOM ELEMENTS
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form---login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUser = document.querySelector('.form-user-data');
const updatePassword = document.querySelector('.form-user-password');
const bookButton = document.getElementById('book-tour');

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailField = document.getElementById('email').value;
    const passwordField = document.getElementById('password').value;
    login(emailField, passwordField);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('submit', logout);
}

if (updateUser) {
  updateUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name',document.getElementById('name').value);
    form.append('email',document.getElementById('email').value);
    form.append('photo',document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });
}
if (updatePassword) {
  updatePassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    
    document.querySelector('.btn--save-password').textContent =
      'Update Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if(bookButton) {
  bookButton.addEventListener('click', e => {
    e.preventDefault();
    e.target.textContent = 'Processing..';
    const {tourid} =e.target.dataset;
    bookTour(tourid)
  })
}
