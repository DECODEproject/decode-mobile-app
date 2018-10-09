# Pilots

## Decode Connector 

The DECODE Connector is an ad-hoc service providing an interface between an external service (eg: one of the pilots) and Chainspace. 

The current implementation primarily serves the needs of the petition use case and it's being used by Decidim. The code can be found in this [repository](https://github.com/DECODEproject/decidim-decode-connector). This can be used for inspiration for future Decode connectors needed in other integrations.

### Methods
The following methods can be initiated by the service:

| Method                    | Description   |
| ------------------------- |:-------------:|
| Create petition | Initiate a new blockchain, specifying the type of smart contract. Returns id of the initial block |
| Close petition | Consumes the last object in the blockchain, so that no new transactions can be added. Returns the decrypted tallied results of the petition |
| Count | Returns the number of participants / votes in the blockchain at the moment. Does not return tallies of actual votes or attributes, which remain encrypted until the petition is closed. |

## Credential Issuer

In the final vision, DECODE users can request credentials from various authorities, including their peers for certain applications. The output of this process is a verified credential that is stored in the user's Wallet app. The credential can then be used in transactions initiated through the app.

The credential issuer is an API that will return the user's credential if they can be verified. The specification of the API can be found [here](https://github.com/DECODEproject/credential-issuer-api-definition). It is expected that each pilot will have its own credential issuer.

- In the case of the Decidim pilot, users are directed (from within the wallet)  to a mock of the Barcelona City Council's census API. After entering some identifying data, they are issued a credential which certifies that they are residents of Barcelona. This credential is then required for the petition signing transaction.

  - The Decidim credential issuer is in this [repository](https://github.com/DECODEproject/credential-issuer). It currently returns a hard-coded credential pending to integrate Coconut in the Decode platform.
   
- For the IoT pilot, our current understanding is that a credential should be issued to a user during the SC onboarding process. The credential would certify that the user is the verified owner of a specific device. Later, when deciding entitlements, this credential would be used in the smart contract that encodes the entitlements (e.g. Device #42 authorises hourly averaged data to be visible to residents of Gràcia).

## Verifier

The mechanism for verifying the attribute the user is claiming is up to each pilot partner. 

The credential makes a request to the verifier to verify (or not) an attribute. The definition of what the API should look like can be found [here](https://github.com/DECODEproject/verifier-api-definition).

For example, Decidim will simply run a server with a hard-coded list of usernames or emails. This will run as a service deployed in the Decidim instance running the pilot platform.

## Decidim Example

### Detailed description

1. The Decidim administrator creates a new petition on the Decidim instance. In this process, the decode-connector is called and creates a new petition object on the ledger. A link to this object is returned to Decidim and associated with the petition.

2. The user accesses the petition through the Decidim website. When choosing to sign a petition with DECODE, the user is directed to the DECODE application. Given the id of the petition, the app will retrieve the following information from the Decidim API:
    1. Petition title
    2. Description
    3. Required and optional attributes
    4. URL for acquiring a required attribute
    5. Image

3. In the app, the user is informed of which petition they are signing and which of their information is requested (attributes).

4. If the user is missing a required attribute (e.g. verified residency), they are referred to the external credential issuer. This service shall verify their eligibility to receive a credential (such as a token certifying they are authorised to participate in the pilot, or are residents of the city). No information is shared with Decidim at this time.

5. Once all required attributes are available, the user can sign the petition with a Yes/No vote, mandatory attributes, and any optional attributes they choose to share. This information is combined with the current status of the petition on the ledger, and the app generates a transaction that updates the count on the ledger. The nature of this smart contract ensures that:

    1. No personally identifiable data is transmitted, only aggregations.
    2. The transaction and vote cannot be traced back to the user, as the app communicates with the ledger over Tor and the Yes/No vote cannot be decrypted to reveal the user's opinion or preference.
    3. Side-channel attacks are blocked because the petition is tallied using homomorphic encryption, so that the total of each vote is not known until the end of the process (though its integrity can be verified).

6. After the process is complete, the Decidim administrator closes the petition. The decode-connector decrypts the final totals and returns the results to the Decidim instance. No further voting is possible (the ledger will refuse any further transactions).

7. The dashboard can now load data from the Decidim API as well as aggregated results directly from the ledger. Users can explore the anonymised, aggregated overview of petition signatures and the optional data users have chosen to share (e.g. breakdown of support by age group or district).

### Tech Vision

![Decidim Tech Vision](Decidim-TechVision.png)

## Future Development

[To Do]