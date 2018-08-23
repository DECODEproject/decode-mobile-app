import Attribute from '../../lib/Attribute';

describe('Attribute ', () => {
  it('constructor should initiate attribute with empty fields', () => {
    const attributeDefinition = {
      predicate: 'schema:addressLocality',
      object: 'Amsterdam',
      scope: 'can-access',
      provenance: {
        url: 'http://villarriba-decode.s3-website-eu-west-1.amazonaws.com',
      },
    };
    const credential = '0123456789';
    const walletId = 'some-id';

    const actualAttribute = new Attribute(attributeDefinition, credential, walletId);

    const expectedAttribute = {
      predicate: 'schema:addressLocality',
      object: 'Amsterdam',
      scope: 'can-access',
      provenance: {
        source: 'http://villarriba-decode.s3-website-eu-west-1.amazonaws.com',
        credentials: '0123456789',
      },
      subject: 'some-id',
    };

    expect(actualAttribute.toJSON()).toEqual(expectedAttribute);
  });
});
