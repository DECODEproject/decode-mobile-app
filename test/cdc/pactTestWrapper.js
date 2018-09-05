jest.setTimeout(10000); //* This is to give the pact mock server time to start

// Create mock provider
beforeAll(() => global.provider.setup());
// Ensure the mock provider verifies expected interactions for each test
afterEach(() => global.provider.verify());
// Tear down the mock and write the pact
afterAll(() => global.provider.finalize()); // Tear down the mock and write the pact
