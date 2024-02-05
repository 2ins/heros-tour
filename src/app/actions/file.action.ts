import { ImageHelp } from '../model/image';
export class AddFile {
  static readonly type = '[File] addFile';
  constructor(public payload: ImageHelp) {}
}

export class CleanFile {
  static readonly type = '[File] addFile';
}
