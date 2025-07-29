import { AuthRepository } from '../../domain/interfaces/AuthRepository';
import { UserDTO } from '../dtos/UserDTO';
import { User } from '../../domain/entities/User';

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async loginWithGithub(email: string, name: string | null): Promise<UserDTO> {
    let user = await this.authRepository.findUserByEmail(email);
    
    if (!user) {
      user = await this.authRepository.createUser(
        new User(
          crypto.randomUUID(),
          email,
          name,
          new Date(),
          new Date()
        )
      );
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }
}