import { PixCreateResponse, PixTransactionResponse, PixTransferResponse } from "./types";
import axios from "axios";
import sharp from "sharp";

interface PixCreateParams {
  value: number;
  webhook_url?: string;
  split_rules?: Array<{ value: number; account_id: string }>;
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
    const { value, webhook_url, split_rules } = params;

    try {
      const response = await axios.post(`${this.config.apiBase}/pix/cashIn`, { value, webhook_url, split_rules }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.token}`,
        }
      });



      async function addWhiteBorder(base64Input: string) {
        const borderSize = 30;
        const imageBuffer = Buffer.from(base64Input, 'base64');


        const original = sharp(imageBuffer);
        const metadata = await original.metadata();

        const width = metadata.width + borderSize * 2;
        const height = metadata.height + borderSize * 2;


        const outputBuffer = await sharp({
          create: {
            width,
            height,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
          }
        })
          .composite([
            {
              input: imageBuffer,
              top: borderSize,
              left: borderSize
            }
          ])
          .png()
          .toBuffer();


        return outputBuffer.toString('base64');
      }

      const qr_code_base64 = await addWhiteBorder(response.data.qr_code_base64.split(",")[1]);

      return { ...response.data, qr_code_base64 };
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
