# Glossary

### Attribute

This term appears several times throughout the code but is now deprecated. This is now being referred to as simply "data" to be more user friendly. 

Attribute is used to describe a piece of information that a user inputs to the app or a piece of information that an external application is asking for. 

An attribute has a specific structure as defined in the original Decode architecture document, including the fields *object*, *subject*, *provenance*, *scope*, and *predicate*. Please see the architecture document for a definition of these fields.

From now on in this glossary, attribute will be referred to as data. 
  
### Credential issuer

The credential issuer is an entity which asks the verifier if a piece of information is valid and returns a credential which proves a piece of information has been verified. 

See Verifier for more information.

### Decidim

A pilot partner which is a community engagement platform in Barcelona. [More Info on Decidim](Pilots.md)

### Mandatory data

In the case of Decidim and possibly future integration partners, there is the concept of mandatory and optional data. 

Mandatory data is a piece of information that must be provided in order to complete the intended action. 

### Optional data

A piece of information that users have the option of sharing or not when completing some action. 

### Unverified data 

A piece of information which a user has input into the app but it has not be verified by an external authority. 

### Verified data

A piece of information which a user has input into the app that has be verified by an external authority and includes a credential or token that provides proof of verification. 

### Verifier

The verifier checks if a piece of information is "valid." It is usually provided by an integration partner and they decide what "valid" means for them. 

It will send back to the credential issuer a boolean response which tells the CI whether to issue a credential or not. 

### Wallet

A deprecated term, refers to what is now known as simply 'the app'.

