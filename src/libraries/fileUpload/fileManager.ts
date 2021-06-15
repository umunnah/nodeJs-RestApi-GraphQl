import { Cloundinary } from "./cloudinary";
import { FileManagerInterface } from "./fileManagerInterface";
import { LocalStorage } from "./localStorage";
import { Service } from 'typedi';
require("dotenv").config();

@Service()
export class FileManager {

  async upload(file: string, fileManagerInterface: FileManagerInterface) {
    return fileManagerInterface.file(file);
  }

  async file(file: string) {

    console.log("i gpt here");
    let service: any;
    if (process.env.StorageType == undefined) {
      service = new LocalStorage();
    } else {
      service = new Cloundinary();
    }

    return await this.upload(file, service); 
  }
}