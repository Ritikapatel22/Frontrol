const readEnvironmentVariable = (variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable ${variable}`)
  }
  return process.env[variable]
}

export const agGridLicenseKey = readEnvironmentVariable(
  'REACT_APP_AG_GRID_LICENSE_KEY',
)

export const fakeDataBaseUrl = readEnvironmentVariable(
  'REACT_APP_FAKEDATA_BASE_URL',
)

export const apiBaseUrl = readEnvironmentVariable('REACT_APP_API_BASE_URL')

export const rootPath = readEnvironmentVariable('REACT_APP_ROOT_PATH')

export const coupaBaseUrl = readEnvironmentVariable('REACT_APP_COUPA_BASE_URL')

export const abcBaseUrl = readEnvironmentVariable('REACT_APP_ABC_BASE_URL')

export const abcDevBaseUrl = readEnvironmentVariable('REACT_APP_ABC_DEV_BASE_URL')

