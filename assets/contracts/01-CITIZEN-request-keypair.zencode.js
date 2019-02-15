export default uniqueId => `-- 0 for silent logging
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run over the mobile wallet the first time and store the output as keypair.keys"
         Given that I am known as '${uniqueId}'
         When I create my new credential request keypair
         Then print all data
]])

ZEN:run()
`;