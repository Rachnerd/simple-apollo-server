import fetch from "node-fetch";

export class PriceService {
  getById(id: string): Promise<number> {
    return fetch(`http://localhost:8080/price/${id}`).then((res) => res.json());
  }

  getByIds(ids: readonly string[]): Promise<number[]> {
    return fetch(`http://localhost:8080/price?ids=${ids.join(",")}`).then(
      (res) => res.json()
    );
  }
}
