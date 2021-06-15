import { FileManagerInterface } from "./fileManagerInterface";

export class LocalStorage implements FileManagerInterface {
  file(file: string):string {
    return 'am using localStorage'
  }

}