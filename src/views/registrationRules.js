const email = v =>
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    v
  ) || 'Email must be valid'
const required = v => !!v || 'This field is required'
const password = v =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
  'Password must contain at least one digit, one upper-, one lower case and eight characters'
const max20 = v => (v ? v.length <= 20 || 'Max 20 characters' : true)
const max200 = v => (v ? v.length <= 200 || 'Max 200 characters' : true)
export { email, required, password, max20, max200 }
