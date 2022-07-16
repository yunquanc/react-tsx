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
  insert(param: { date: Number; timeList: Number[] }): Promise<any> {
    return super.post("/api/insert", { ...param });
  }
  save(param: {}): Promise<any> {
    return super.post("/api/save", { ...param });
  }
  getTemp(): Promise<any> {
    return super.post("/api/gettemp", {});
  }
}
