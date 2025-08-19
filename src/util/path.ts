import path from 'path';

export default () => {
  return path.dirname(process.mainModule.filename);
}