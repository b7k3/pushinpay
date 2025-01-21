# Pushinpay

**Pushinpay** é uma biblioteca para integrar pagamentos PIX de forma simples e eficiente, com suporte para cobranças, transferências e reembolsos.

## Instalação

```bash
$ npm install pushinpay
```

## Importar e Autenticar

```typescript
import { Pushinpay } from "pushinpay";

const pushinpay = new Pushinpay({ token: "SEU_TOKEN", sandbox: false });
```

## Criar Pagamento PIX

```typescript
pushinpay.pix.create({
  value: 100, // Valor da cobrança (INT)
  webhook: "https://meusite.com/webhook" // URL de notificação
});
```

## Obter Status de um Pagamento

```typescript
pushinpay.pix.status({
  id: "9C17B975-903F-44CB-BB70-E838F85DC228" // ID do pagamento
});
```

## Reembolsar Pagamento

```typescript
pushinpay.pix.refund({
  id: "9C17B975-903F-44CB-BB70-E838F85DC228" // ID do pagamento
});
```

## Realizar Transferência PIX

```typescript
pushinpay.pix.transfer({
  pix_key: "pushinpay@gmail.com", // Chave PIX
  pix_key_type: "email", // Tipo da chave: "evp" | "national_registration" | "phone" | "email"
  value: 100, // Valor da transferência
  webhook_url: "https://meusite.com/webhook" // URL de notificação
});
```
