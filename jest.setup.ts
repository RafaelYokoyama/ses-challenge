import '@testing-library/jest-dom'

global.fetch = jest.fn()

jest.mock('fs', () => ({
  promises: {
    access: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}))

jest.mock('path', () => ({
  join: jest.fn((...args: string[]) => args.join('/')),
}))

const mockLocation = {
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  toString: () => 'http://localhost:3000',
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})


Object.defineProperty(window.location, 'href', {
  set: jest.fn(),
  get: () => mockLocation.href,
  configurable: true,
})
