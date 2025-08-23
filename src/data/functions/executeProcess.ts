import { exec } from 'node:child_process';

import { ResultWithValue } from '../contracts/resultWithValue';

interface IExecute {
  args: Array<string>;
  workingDir?: string;
}
export const execute = (props: IExecute): Promise<ResultWithValue<string>> => {
  return new Promise((resolve, reject) => {
    const queryOpts: Array<string> = [...props.args];

    exec(
      queryOpts.join(' '), //
      {
        cwd: props.workingDir,
      },
      (error, stdout, __) => {
        if (error) {
          reject({
            isSuccess: false,
            errorMessage: error,
          });
        } else {
          resolve({
            isSuccess: true,
            value: stdout,
          });
        }
      },
    );
  });
};
