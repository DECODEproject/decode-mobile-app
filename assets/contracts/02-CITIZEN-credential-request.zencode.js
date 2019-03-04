import declarations from './declarations';

export default (uniqueId, declaredAttributes) => `-- 0 for silent logging
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run after the request keypair is stored (keypair.keys)"
     Given that I am known as '${uniqueId}'
     and I have my credential keypair
     ${declarations(declaredAttributes)}
     When I request a blind signature of my keypair
     Then print all data
]])

ZEN:run()`;
