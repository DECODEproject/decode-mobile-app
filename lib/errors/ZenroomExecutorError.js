export default class ZenroomExecutorError extends Error {
  constructor(message) {
    super(message || 'Error executing Zenroom');
  }
}
