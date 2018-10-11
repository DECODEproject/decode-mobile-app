import { NativeModules } from 'react-native';

export default class ZenroomExecutor {
  execute(contract, data = {}, keys = {}) {
    console.log("on executor!");
    return NativeModules.Zenroom.execute(contract, JSON.stringify(data), JSON.stringify(keys));
  }
}
