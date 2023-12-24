export function tokenTimeConfig() {
    return {
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN || 'SECRET',
      signOptions: {
        expiresIn: '10m',
      },
    };
}