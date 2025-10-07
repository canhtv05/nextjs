import i18next from 'i18next'

export const toFullName = (lastName: string, middleName: string, firstName: string): string => {
  const i18n = i18next.language
  if (i18n === 'vi') {
    return `${lastName ? lastName : ''} ${middleName ? middleName : ''} ${firstName ? firstName : ''}`.trim()
  }

  return `${firstName ? firstName : ''} ${middleName ? middleName : ''} ${lastName ? lastName : ''}`.trim()
}

export const convertBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const separationFullName = (fullName: string) => {
  const result = {
    firstName: '',
    middleName: '',
    lastName: ''
  }
  const i18n = i18next.language
  const arrFullName = fullName.trim().split(' ')?.filter(Boolean)
  if (arrFullName.length === 1) {
    if (i18n === 'vi') {
      result.firstName = arrFullName[0]
    } else {
      result.lastName = arrFullName[0]
    }
  } else if (arrFullName.length === 2) {
    if (i18n === 'vi') {
      result.lastName = arrFullName[0]
      result.firstName = arrFullName[1]
    } else {
      result.firstName = arrFullName[0]
      result.lastName = arrFullName[1]
    }
  } else if (arrFullName.length >= 3) {
    if (i18n === 'vi') {
      result.lastName = arrFullName[0]
      result.middleName = arrFullName.slice(1, -1).join(' ')
      result.firstName = arrFullName[arrFullName.length - 1]
    } else {
      result.firstName = arrFullName[0]
      result.middleName = arrFullName.slice(1, -1).join(' ')
      result.lastName = arrFullName[arrFullName.length - 1]
    }
  }

  return result
}
