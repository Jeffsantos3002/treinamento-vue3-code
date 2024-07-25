import { reactive } from 'vue'

const state = reactive ({
  currentUser: {}
})

export default state

export function CleanCurrentUser () {
  state.currentUser = {}
}

export function setCurrentUser (user) {
  state.currentUser = user
}
export function setApiKey (ApiKey) {
  const currentUser = { ...state.currentUser, ApiKey }
  state.currentUser = currentUser
}
