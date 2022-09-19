export class VaultItemDTO {
  name: string;
  usernameOrEmail: string;
  password: string;
  vaultId: string;
  hash?: string;
  link?: string;
}
