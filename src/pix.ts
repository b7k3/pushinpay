import { PixCreateResponse, PixTransactionResponse, PixTransferResponse } from "./types";
import axios from "axios";

interface PixCreateParams {
  value: number;
  webhook_url?: string;
}

interface PixTransactionParams {
  id: string;
}

interface PixTransferParams {
  value: number;
  pix_key_type: "evp" | "national_registration" | "phone" | "email";
  pix_key: string;
  webhook_url?: string;
}

interface PixRefundParams {
  id: string;
}

export class Pix {
  private config: { token: string; apiBase: string; };

  constructor(config: { token: string; apiBase: string; }) {
    this.config = config;
  }

  public async create(params: PixCreateParams): Promise<PixCreateResponse> {
    const { value, webhook_url } = params;

    try {
      const response = await axios.post(`${this.config.apiBase}/pix/cashIn`, { value, webhook_url }, {
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

  public async status(params: PixTransactionParams): Promise<PixTransactionResponse> {
    const { id } = params;

    try {
      const response = await axios.get(`${this.config.apiBase}/transactions/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.token}`,
        },
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

  public async transfer(params: PixTransferParams): Promise<PixTransferResponse> {
    const { value, pix_key_type, pix_key, webhook_url } = params;

    try {
    const response = await axios.post(`${this.config.apiBase}/pix/cashOut`, { value, pix_key_type, pix_key, webhook_url }, {
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

  public async refund(params: PixRefundParams): Promise<Array<[]>> {
    const { id } = params;

    try {
    const response = await axios.post(`${this.config.apiBase}/transactions/${id}/refund`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.token}`,
      },
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
