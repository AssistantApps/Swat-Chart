import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { Result, ResultWithValue } from '@/data/contracts/resultWithValue';

export const getVersionNumFromPackageJson = async (basePath: string): Promise<string> => {
  try {
    const packageJsonFile = path.join(basePath, 'package.json');
    const packageString = await fs.readFile(packageJsonFile, 'utf8');
    const pkg = JSON.parse(packageString);
    return pkg.version;
  } catch (ex) {
    console.error(`fileHelper.ts - Unable to get version from package.json. Err: ${ex}`);
    return '0.0.0';
  }
};

export const getIndexOfFolderSlash = (destFilePath: string) => {
  const lastIndexOfSlash = Math.max(
    destFilePath.lastIndexOf('\\'), //
    destFilePath.lastIndexOf('/'),
  );
  return lastIndexOfSlash;
};

export const getFileFromFilePath = (filePath: string) => {
  const lastIndexOfSlash = getIndexOfFolderSlash(filePath);
  return filePath.substring(lastIndexOfSlash + 1);
};

export const createFoldersOfDestFilePath = async (destFilePath: string) => {
  const lastIndexOfSlash = getIndexOfFolderSlash(destFilePath);
  const destFolder = destFilePath.substring(0, lastIndexOfSlash);
  const exists = await fileExists(destFolder);
  if (!exists) {
    await fs.mkdir(destFolder, { recursive: true });
  }
};

export const createTempDirectory = async (dirName: string): Promise<string> => {
  const osTempDir = os.tmpdir();
  const tmpDir = path.join(osTempDir, dirName);
  const tempDir = await fs.mkdtemp(tmpDir);
  return tempDir;
};

export const writeLinesToFile = async (content: string, fullFilePath: string): Promise<Result> => {
  try {
    await createFoldersOfDestFilePath(fullFilePath);
    await fs.writeFile(fullFilePath, content);
    return { isSuccess: true };
  } catch (ex) {
    const message = `Unable to write lines to file: '${fullFilePath}'`;
    console.error(`fileHelper.ts - ${message}. Err: ${ex}`);
    return { isSuccess: false, errorMessage: message };
  }
};

export const readJsonFile = async <T>(fullFilePath: string): Promise<ResultWithValue<T>> => {
  try {
    await createFoldersOfDestFilePath(fullFilePath);
    const content = await fs.readFile(fullFilePath, 'utf-8');
    return { isSuccess: true, value: JSON.parse(content) };
  } catch (ex) {
    const message = `Unable to write lines to file: '${fullFilePath}'`;
    console.error(`fileHelper.ts - ${message}. Err: ${ex}`);
    return { isSuccess: false, errorMessage: message };
  }
};

export const getFileExtensionFromUrl = (fileUrl: string): string | null => {
  try {
    const lastDotIndex = fileUrl.lastIndexOf('.');
    if (lastDotIndex === -1) return null;

    return fileUrl.substring(lastDotIndex + 1);
  } catch (error) {
    console.error(`Invalid url. ex: ${error}`);
    return null;
  }
};

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const downloadFileFromUrl = async (
  imageUrl: string,
  imageFolder: string,
  fileName: string,
): Promise<ResultWithValue<string>> => {
  try {
    if (imageUrl == null || imageUrl.length < 10) {
      throw 'File url is null';
    }

    const destFile = path.join(imageFolder, fileName);

    const exists = await fileExists(destFile);
    if (exists === true) {
      await fs.unlink(destFile);
    }

    const response = await fetch(imageUrl);
    const arrBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrBuffer);
    await fs.writeFile(destFile, buffer);

    return {
      isSuccess: true,
      value: destFile,
    };
  } catch (ex) {
    const errMsg = `Error occurred while downloading a file from url: ${ex?.toString?.()}`;
    console.error(errMsg);
    return {
      isSuccess: false,
      errorMessage: errMsg,
    };
  }
};
