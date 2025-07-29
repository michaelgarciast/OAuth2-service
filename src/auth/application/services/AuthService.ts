import { AuthUseCase } from '../useCases/AuthUseCase';
import { UserDTO } from '../dtos/UserDTO';

export class AuthService {
  constructor(private authUseCase: AuthUseCase) {}

  async authenticateWithGithub(email: string, name: string | null): Promise<UserDTO> {
    return await this.authUseCase.loginWithGithub(email, name);
  }
}