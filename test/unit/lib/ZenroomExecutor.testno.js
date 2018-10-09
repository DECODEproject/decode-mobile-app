import ZenroomExecutor from '../../lib/ZenroomExecutor';


describe('ZenroomExecutor ', () => {
  xit('should execute hello world contract and return a promise "hello world"', async () => {
    const executor = new ZenroomExecutor();
    const contract = `
    print("hello world")
    `;

    const result = await executor.execute(contract);

    expect(result).toEqual('hello world');
  });

  xit('it should reject the promise if the script do an assert', async () => {
    const executor = new ZenroomExecutor();
    const contract = `
    assert(false, "test")
    `;

    await expect(executor.execute(contract, {})).rejects.toThrow();
  });

  xit('it use data object', async () => {
    const executor = new ZenroomExecutor();
    const contract = `
    local DATA_TABLE = JSON.decode(DATA)
    msg = DATA_TABLE['msg']
    print(msg)
    `;

    const data = {
      msg: 'Hello!',
    };

    const result = await executor.execute(contract, data);

    expect(result).toEqual('Hello!');
  });

  xit('it use keys object', async () => {
    const executor = new ZenroomExecutor();
    const contract = `
    local KEYS_TABLE = JSON.decode(KEYS)
    msg = KEYS_TABLE['msg']
    print(msg)
    `;

    const key = {
      msg: 'Hello!',
    };

    const result = await executor.execute(contract, {}, key);

    expect(result).toEqual('Hello!');
  });
});
