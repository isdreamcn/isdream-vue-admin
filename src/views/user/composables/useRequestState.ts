import { ref } from 'vue'

export type RequestStatus = 'pending' | 'success' | 'error'

export const useRequestState = () => {
  const requestStatus = ref<RequestStatus | null>(null)
  const requestMessage = ref('')

  const setRequestStatus = (status: RequestStatus, message: string) => {
    requestStatus.value = status
    requestMessage.value = message
  }

  return { requestStatus, requestMessage, setRequestStatus }
}
