import setCredential from '../../../../../application/redux/actions/credentials';
import Attribute from '../../../../../lib/Attribute';

describe('setCredential', () => {
  const credential = new Attribute({
    predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
  }, '6c347975ca6aac24b46d9749808ae5392816ac23988e5dc46df4b85c0a', '');
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  it('should save a credential on the phone\'s local storage', async () => {
    getItemMock.mockResolvedValue([]);
    await setCredential(getItemMock, setItemMock, credential);

    expect(setItemMock).toBeCalledWith('credentials', [credential]);
  });

  it('should add another credential on the phone\'s local storage', async () => {
    const existingCredential = new Attribute({
      predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
    }, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');
    getItemMock.mockResolvedValue([existingCredential]);
    await setCredential(getItemMock, setItemMock, credential);

    expect(setItemMock).toBeCalledWith('credentials', [existingCredential, credential]);
  });
});
