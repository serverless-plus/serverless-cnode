import { IStore } from '@interfaces';
const isServer = typeof window === 'undefined';

class Store implements IStore {
  removeItem(key) {
    return localStorage.removeItem(key);
  }
  getItem(key) {
    if (isServer) {
      return '{}';
    }
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }
  clear() {
    return localStorage.clear();
  }
}

const instance = new Store();
export default instance;
