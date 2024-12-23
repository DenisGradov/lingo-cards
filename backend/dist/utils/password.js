import bcrypt from 'bcrypt';
const saltRounds = 10;
/**
 * Hashes the provided password.
 * @param password - The plain text password to hash.
 * @returns A promise that resolves with the hashed password.
 */
export function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}
/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hash - The hashed password.
 * @returns A promise that resolves with `true` if the passwords match, otherwise `false`.
 */
export function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
