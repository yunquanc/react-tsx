import { HTTP } from ".";

export interface IAPI {
  list(obj: {}): Promise<any>;
}

export class CAPI extends HTTP implements IAPI {
  constructor() {
    super();
  }
  list(): Promise<any> {
    return super.post("/api/list", {});
  }
}
