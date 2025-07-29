export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
