import ZenroomContract from '../../lib/ZenroomContract';
import ZenroomExecutor from '../../lib/ZenroomExecutor';

import contract from '../../assets/contracts/vote';
import Signature from '../../lib/Signature';

jest.mock('../../lib/ZenroomExecutor.js');


describe('ZenroomContract', () => {
  describe('addSignature', () => {
    it('should call Zenroom Executor with the correct parameters', async () => {
      const zenroomResult = {};
      const executeMock = jest.fn();
      executeMock.mockResolvedValue(zenroomResult);

      ZenroomExecutor.mockImplementation(() => ({
        execute: executeMock,
      }));
      const zenroomExecutor = new ZenroomExecutor();
      const zenroomContract = new ZenroomContract(zenroomExecutor);

      const signature = new Signature('YES', 'ANY', 'ANY');
      const vote = 'YES-ANY-ANY';
      const currentOutputs = ['{"type": "PetitionEncToken"}', '{"public": "...."}'];
      const data = {
        public: '....',
        option: vote,
      };

      await zenroomContract.addSignature(signature, currentOutputs);

      expect(executeMock).toBeCalledWith(contract, data);
    });

    xit('should return an error if there is an issue executing Zenroom', () => {});
    xit('should return a valid transaction', () => {});
  });
});
