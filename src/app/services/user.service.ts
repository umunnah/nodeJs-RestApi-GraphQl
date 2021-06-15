import { Service } from 'typedi';
import UserRepository from "../repository/user.repository"
import { FileManager} from '../../libraries/fileUpload/fileManager'

@Service()
class UserService {
  constructor(public userRepository: UserRepository, public fileManager: FileManager) {
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async create(data: any){
    return await this.userRepository.create(data);
  }

  async login(email: string, password: string) {
    return await this.userRepository.login(email, password);
  }

  async getUser(id:string) {
    console.log("file", await this.fileManager.file("testing"));
    return await this.userRepository.getUser(id);
  }
}

export default UserService;

