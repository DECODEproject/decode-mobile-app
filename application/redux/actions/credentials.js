

export default async function setCredential(getItem, setItem, attribute) {
  const currentCredentials = await getItem('credentials');

  const allCredentials = [...currentCredentials, attribute];

  await setItem('credentials', allCredentials);
}
