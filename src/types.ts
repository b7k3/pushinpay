export interface PixCreateResponse {
    id: string; 
    qr_code: string; 
    status: string; 
    value: number; 
    webhook_url: string; 
    qr_code_base64: string;
    split_rules: Array<{ value: number; account_id: string }>;
  }

  export interface PixTransactionResponse {
    id: string; 
    status: string; 
    value: string; 
    description?: string; 
    payment_type: string;
    created_at: string;
    updated_at: string;
    webhook_url: string;
    split_rules: Array<{ value: number; account_id: string }>;
    payer_name?: string;
    payer_national_registration?: string;
    end_to_end_id?: string;
    pix_details: {
      id: string;
      expiration_date: string;
      emv: string;
      created_at: string;
      updated_at: string;
    }
  }

  export interface PixTransferResponse {
    id: string; 
    endToEndId?: string;
    receiver_name?: string;
    webhook_url?: string;
    value: number;
    status: string;
    receiver_national_registration?: string;
    pix_key_type: string;
    pix_key: string;
  }

  export interface AccountBalanceResponse {
    amount: number;
  }
  