// TipJar/backend/src/auth/strategies/siwe.verifier.ts
import { Injectable, Logger, UnauthorizedException, BadRequestException, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { AuthService, ValidatedUser } from '../auth.service'; // Zaimportuj ValidatedUser z AuthService

@Injectable()
export class SiweVerifier {
  private readonly logger = new Logger(SiweVerifier.name);

  constructor(private authService: AuthService) {} // Wstrzyknięcie AuthService

  /**
   * Weryfikuje podpis SIWE na podstawie otrzymanej wiadomości i podpisu,
   * a następnie waliduje lub tworzy użytkownika w systemie TipJar.
   * @param message Pełna wiadomość SIWE jako string.
   * @param signature Podpis wiadomości SIWE.
   * @param addressFromRequest Adres Ethereum, który (według żądania) podpisał wiadomość.
   * @returns Obietnica z obiektem zwalidowanego użytkownika.
   */
  async verifySignatureAndLogin(
    message: string,
    signature: string,
    addressFromRequest: string, 
  ): Promise<ValidatedUser> {
    this.logger.log(`SiweVerifier: Attempting to verify SIWE signature for address from request: ${addressFromRequest}.`);

    // Krok 1: Weryfikacja wiadomości SIWE (w tym nonce z Redis i podpisu) przez AuthService
    const recoveredAddress = await this.authService.verifySiweMessage(message, signature, addressFromRequest);
    
    // Sprawdzenie, czy adres odzyskany z podpisu zgadza się z adresem podanym w żądaniu
    // (AuthService.verifySiweMessage powinien już to robić wewnętrznie)
    if (!recoveredAddress || recoveredAddress.toLowerCase() !== addressFromRequest.toLowerCase()) {
      this.logger.warn(`SiweVerifier: SIWE signature verification failed, or recovered address does not match request address. Recovered: ${recoveredAddress}, Requested: ${addressFromRequest}`);
      throw new UnauthorizedException('Nieprawidłowy podpis SIWE, niezgodność adresu lub problem z nonce.');
    }

    this.logger.log(`SiweVerifier: SIWE signature successfully verified. Recovered address: ${recoveredAddress}. Proceeding to validate/create user.`);
    
    // Krok 2: Walidacja/tworzenie użytkownika w TipJar na podstawie zweryfikowanego adresu
    // Dla SIWE, email nie jest częścią standardowej wiadomości.
    // DisplayName można wygenerować na podstawie adresu lub pozwolić użytkownikowi ustawić później.
    const displayName = `${recoveredAddress.slice(0, 6)}...${recoveredAddress.slice(-4)}`; // Przykład
    
    try {
      const user = await this.authService.validateOAuthUser(
        'siwe',             // Provider
        recoveredAddress,   // ProviderId (adres portfela)
        null,               // Email (brak z SIWE)
        displayName,        // Nazwa wyświetlana
        undefined,          // AvatarUrl (brak na tym etapie)
      );
      return user;
    } catch (error) {
      this.logger.error(`SiweVerifier: Error during user validation/creation for SIWE address ${recoveredAddress}: ${error.message}`, error.stack);
      // Przekaż dalej znane wyjątki lub rzuć generyczny błąd serwera
      if (error instanceof HttpException) throw error; 
      throw new InternalServerErrorException('Wewnętrzny błąd serwera podczas przetwarzania logowania SIWE.');
    }
  }
}