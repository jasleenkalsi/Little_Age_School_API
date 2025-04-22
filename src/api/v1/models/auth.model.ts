// src/api/v1/models/auth.model.ts
export class AuthUser {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string = 'parent'
  ) {}

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      role: this.role
    };
  }
}
