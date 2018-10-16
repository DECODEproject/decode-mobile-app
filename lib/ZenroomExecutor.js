import { NativeModules } from 'react-native';

export default class ZenroomExecutor {
  execute(contract, data = {}, keys = {}) {
    return NativeModules.Zenroom.execute(contract, JSON.stringify(data), JSON.stringify(keys));
  }
}
