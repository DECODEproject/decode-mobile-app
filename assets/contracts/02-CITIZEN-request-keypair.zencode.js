const declarations = (firstDeclaredAttribute, ...otherDeclaredAttributes) => {
  if (! firstDeclaredAttribute) return '';
  const first = `When I declare that I am '${firstDeclaredAttribute}'`;
  const others = otherDeclaredAttributes.map(attr => `and I declare that I am '${attr}'`);
  return first + others;
};

export default (uniqueId, ...declaredAttributes) => `-- 0 for silent logging
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run after the request keypair is stored (keypair.keys)"
         Given that I am known as '${unique_id}'
		 and I have my credential request keypair
     ${declarations(declaredAttributes)} 
		 and I request a credential blind signature
		 Then print all data
]])

ZEN:run()`;
