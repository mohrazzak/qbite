/**
 * Generates a random string of characters and digits with the specified length.
 *
 * @param length - The length of the random string to generate.
 * @returns A random string containing characters and digits.
 */
export function getRandomString(length: number): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}
