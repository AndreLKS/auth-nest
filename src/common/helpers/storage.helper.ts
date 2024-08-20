import * as fs from 'fs';
import { promisify } from 'util';

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
    fs
   return fs.existsSync(path); 
}

export const createFile = async (path : string, fileName : string, content : string): Promise<void> => {
    if(!checkIfFileOrDirectoryExists(path)){
        throw new Error(`Diretório ${path} não existe`);
    }

    const writeFile = promisify(fs.writeFile);

    return await writeFile(`${path}/${fileName}`, content);
}

export const addLineToFile = async (path : string, fileName : string, content : string): Promise<void> => {
    if(!checkIfFileOrDirectoryExists(path)){
        throw new Error(`Diretório ${path} não existe`);
    }

    const appendFile = promisify(fs.appendFile);

    return await appendFile(`${path}/${fileName}`, content);
}

export const getFile = async (path : string, encoding? : BufferEncoding): Promise<string | Buffer> => {
    const readFile = promisify(fs.readFile);

    return readFile(path, {encoding: encoding});
}   

export const deleteFile = async (path : string): Promise<void> => {
    const unlink = promisify(fs.unlink);

    return await unlink(path);
}