import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", ()=>{

  beforeEach(()=>{
    inMemoryUsersRepository = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to authenticate a user",async ()=>{
    const user:ICreateUserDTO ={
          name: "Abmael",
          email: "Abmael@",
          password: "12345"
    };
    await createUserUseCase.execute(user);
    
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  })

  it("should not be able to authenticate an no existent user ",  ()=>{
    expect(async ()=>{
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
  
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  });


  it("should not be able  to authenticate with incorret password",async ()=>{
    expect(async ()=>{

      const user:ICreateUserDTO ={
        name: "Abmael",
        email: "Abmael@",
        password: "12345"
  };
  await createUserUseCase.execute(user);
  
  const result = await authenticateUserUseCase.execute({
    email: user.email,
    password: "incorretPassword"
  })
  }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    
   
    
    
  })
  



})