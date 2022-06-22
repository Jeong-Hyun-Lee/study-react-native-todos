import { atom } from 'recoil'

export const post = atom({
  key: 'postContent',
  default: 'empty post',
})
