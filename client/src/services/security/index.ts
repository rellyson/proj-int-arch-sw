import { pwnedPassword } from 'hibp'

export const checkPasswordHaveBeenPwned = async (password: string) => {
  return pwnedPassword(password).then((numPwns) => {
    return numPwns
  })
}
