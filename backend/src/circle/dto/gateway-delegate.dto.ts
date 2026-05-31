import { IsEthereumAddress } from 'class-validator';

export class AddDelegateDto {
  @IsEthereumAddress()
  delegateAddress!: string;
}

export class RemoveDelegateDto {
  @IsEthereumAddress()
  delegateAddress!: string;
}
