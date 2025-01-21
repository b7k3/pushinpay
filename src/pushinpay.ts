import { Pix } from "./pix";

export interface PushinpayConfig {
  token: string;
  sandbox: boolean;
}

class InternalConfig {
  public token: string;
  public sandbox: boolean;
  public apiBase: string;

  constructor(config: PushinpayConfig) {
    this.token = config.token;
    this.sandbox = config.sandbox;
    this.apiBase = config.sandbox
      ? "https://api-sandbox.pushinpay.com.br/api"
      : "https://api.pushinpay.com.br/api";
  }
}

export class Pushinpay {
  private config: InternalConfig;
  public pix: Pix;

  constructor(config: PushinpayConfig) {
    if (!config.token) {
      throw new Error("Token is required");
    }

    this.config = new InternalConfig(config);
    this.pix = new Pix(this.config);
  }
}
