import fetch from "node-fetch";

export class PriceService {
  async getById(id: string): Promise<number> {
    const res = await fetch(`http://localhost:8080/price/${id}`);
    return res.json();
  }

  async getByIds(ids: readonly string[]): Promise<number[]> {
    const res = await fetch(`http://localhost:8080/price?ids=${ids.join(",")}`);
    return res.json();
  }
}
