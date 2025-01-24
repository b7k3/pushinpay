import { AccountBalanceResponse } from "./types";
import axios from "axios";


export class Account {
  private config: { token: string; apiBase: string; };

  constructor(config: { token: string; apiBase: string; }) {
    this.config = config;
  }

  public async balance(): Promise<AccountBalanceResponse> {

    try {
      const response = await axios.get(`${this.config.apiBase}/balance`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.token}`,
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }



}
