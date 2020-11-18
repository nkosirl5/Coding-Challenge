'use static'

/** (on load)
 * INITIAL FUNCTION
 * Save email address to localStorage if remember is checked
 * 
 * Requires:
 *  .logged-in
 */
$(() => {
  $('.logged-in').hide();
  toggleLoggedInOut()
});


/**
 * TOGGLE PROFILE 
 * Save email address to localStorage if remember is checked
 * 
 * Requires:
 *  .logged-in
 *  .logged-out
 *  .local-email
 */
function toggleLoggedInOut() {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.email) {
      $('.logged-in').show();
      $('.logged-out').hide();
      $('.local-email').html(localStorage.email)
    } else {
      $('.logged-out').show();
      $('.logged-in').hide();
      $('.local-email').html("not saved")
    }
  } else {
    $('.logged-out').show();
    $('.logged-in').hide();
    $('.local-email').html("not savable")
  }
};


/** (on load)
 * PUT EMAIL QUERY INTO FORM
 * Finds the email query in the URL and finds the input called 'email',
 * then it makes the value of the input the email address in the query.
 * 
 * This is needed because a submitted form will reset the whole query string,
 * this puts the email query with the other info into the new URL on form submission.
 * 
 * Requires a:
 * - check box with id='remember'
 * - input field with id='email'
 */
$(() => {
    const params = new URLSearchParams(location.search);
    $('#email').val(params.get('email'))
});


/** 
 * EMAIL SAVE
 * Save email address to localStorage if remember is checked
 * 
 * Requires a:
 * - check box with id='remember'
 * - input field with id='email'
 */
function rememberEmail() {
  const params = new URLSearchParams(location.search);
  if ($("#remember").prop('checked')) {
    const email = document.getElementById("email").value;
    localStorage.setItem("email", email);
  } else if(params.get('email') !== null) {
    localStorage.setItem("email", params.get('email'));
  }
  toggleLoggedInOut();
}

/** 
 * EMAIL FORGET
 * Clears email address from localStorage
 * 
 */
function forgetEmail() {
  localStorage.removeItem("email");
  toggleLoggedInOut();
}