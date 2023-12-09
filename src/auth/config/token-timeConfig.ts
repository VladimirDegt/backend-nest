export function tokenTimeConfig() {
    return {
        secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
        expiresIn: '24h',
    }}
}