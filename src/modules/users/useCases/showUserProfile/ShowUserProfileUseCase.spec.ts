import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";


let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase;

  describe("Shoul be able ", ()=>{

    beforeEach(()=>{
      inMemoryUsersRepository = new InMemoryUsersRepository()
      authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
      createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
      
    });


  it("should be able to authenticate a user ", async ()=>{
    const user: ICreateUserDTO = {
          name: "Abmael",
          email: "Abmael@",
          password: "12345"
    };
    await createUserUseCase.execute(user);
    const result  = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,

    });

   expect(result).toHaveProperty("token")

  })
  })