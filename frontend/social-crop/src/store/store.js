import { writable } from 'svelte/store'
import { fileImageStatus } from '../constants'
export const imageStatus = writable(fileImageStatus.INITIAL)
export const selectedNetworks = writable([])
export const croppedUrlsFromAPI = writable([])
