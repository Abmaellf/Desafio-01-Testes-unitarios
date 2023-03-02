import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;

describe("Create User", ()=>{
  beforeEach(()=>{
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  })
  
  it("should be able to create a new User", async ()=>{

      const user = {
        name:"abmael",
        email:"abmael@",
        password: "1234"
      }

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });

      const userCreated = await inMemoryUserRepository.findByEmail(user.email)
      console.log(userCreated);
      expect(userCreated).toHaveProperty("id");
      expect(userCreated).toHaveProperty("email");
      expect(userCreated).toHaveProperty("password");
     
  });

  it("should not be able to create a new user with email exists", async ()=>{

    expect( async () =>{
      const user = {
        name: "Pedro",
        email:"Pedro@",
        password: "12345"

      }

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });
 

    }).rejects.toBeInstanceOf(AppError)
  })

})