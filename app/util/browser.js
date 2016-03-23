import platform from 'platform';

export function getBrowserName() {
  return platform.name;
}

export function getBrowserVersion() {
  return platform.version;
}

export function getOSName() {
  return platform.os.family;
}

export function getOSVersion() {
  return platform.os.version;
}
