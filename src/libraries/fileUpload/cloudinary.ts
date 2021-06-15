import { FileManagerInterface } from "./fileManagerInterface";

export class Cloundinary implements FileManagerInterface {
  file(file: string):string {
    return 'am using cloudinary'
  }

}