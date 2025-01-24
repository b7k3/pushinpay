import { PixCreateResponse, PixTransactionResponse, PixTransferResponse } from "./types";

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

    const response = await fetch(`${this.config.apiBase}/pix/cashIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.token}`,
      },
      body: JSON.stringify({ value, webhook_url }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  public async status(params: PixTransactionParams): Promise<PixTransactionResponse> {
    const { id } = params;

    const response = await fetch(`${this.config.apiBase}/transactions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  public async transfer(params: PixTransferParams): Promise<PixTransferResponse> {
    const { value, pix_key_type, pix_key, webhook_url } = params;

    const response = await fetch(`${this.config.apiBase}/pix/cashOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.token}`,
      },
      body: JSON.stringify({ value, pix_key_type, pix_key, webhook_url }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  public async refund(params: PixRefundParams): Promise<Array<[]>> {
    const { id } = params;

    const response = await fetch(`${this.config.apiBase}/transactions/${id}/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }


}
