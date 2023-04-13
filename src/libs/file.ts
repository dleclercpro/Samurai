import fs from 'fs';

const FILE_OPTIONS = { encoding: 'utf-8' as BufferEncoding };

export const readFileSync = (path: string, options = FILE_OPTIONS) => fs.readFileSync(path, options);

export const readFileAsync = async (path: string, options = FILE_OPTIONS) => new Promise<string>((resolve, reject) => {
    fs.readFile(path, options, (err, file) => {
        if (err) {
            reject(err);
        }

        resolve(file);
    });
});


export const readJSONSync = (path: string) => JSON.parse(readFileSync(path));
export const readJSONAsync = async (path: string) => JSON.parse(await readFileAsync(path));