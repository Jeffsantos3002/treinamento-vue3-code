export function checkEmail (email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  console.log(emailRegex.test(email))

  if (!email) {
    return 'Campo obrigatório'
  } else if (!emailRegex.test(email)) {
    return 'Email inválido'
  } else {
    return false
  }
}

export function checkPassword (password) {
  if (!password) {
    return 'Campo Obrigatório'
  } else if (password.length < 4) {
    return 'Campo inválido'
  } else {
    return false
  }
}
