import { ContactRequest } from '../../app/contact/contact.types';

export interface ContactProvider {
  send(request: ContactRequest): Promise<void>;
}

export class DisabledContactProvider implements ContactProvider {
  async send(): Promise<void> {
    throw new Error('Contact provider disabled until legal/provider approval is complete.');
  }
}

export function createContactProvider(): ContactProvider {
  return new DisabledContactProvider();
}
