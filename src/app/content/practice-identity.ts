/**
 * Real, Marta-supplied practice identity (source: `web (1).docx`, 2026-07-31;
 * NIF and the corporate email confirmed 2026-08-08).
 *
 * Everything here is verbatim from the client. Fields she did not supply — postal
 * code, opening hours, prices — are intentionally absent rather than guessed,
 * because this data feeds visible NAP text, `LocalBusiness` structured data and
 * the legal pages, where an invented value is a factual error in three places
 * at once.
 *
 * NOTE: `email` points to the domain-bound mailbox (hilandofinopsicologia.com)
 * she is acquiring but has not confirmed live yet. Do not deploy this to
 * production until she confirms the mailbox actually receives mail — until
 * then this address will bounce anyone who writes to it.
 */
export const practiceIdentity = {
  brandName: 'Hilando Fino Psicología',
  practitionerName: 'Marta Martín',
  professionalTitle: 'Psicóloga General Sanitaria',
  nif: '05688826Y',
  collegiateNumber: 'CM-03249',
  professionalCollegeName: 'Colegio Oficial de la Psicología de Castilla-La Mancha',
  professionalCollegeUrl: 'https://www.copclm.com/',
  healthRegistryNumber: '1309351/1317777',
  phone: '623 92 17 07',
  phoneE164: '+34623921707',
  email: 'info@hilandofinopsicologia.com',
  address: {
    streetAddress: 'Calle Ramón y Cajal 2, Local 2.6',
    addressLocality: 'Ciudad Real',
    addressRegion: 'Castilla-La Mancha',
    addressCountry: 'ES'
  }
} as const;

export const practiceLegalLine = `${practiceIdentity.practitionerName} · ${practiceIdentity.professionalTitle} · Col. ${practiceIdentity.collegiateNumber}`;
export const practiceRegistryLine = `Nº de Registro Sanitario: ${practiceIdentity.healthRegistryNumber}`;
export const practiceAddressLine = `${practiceIdentity.address.streetAddress}, ${practiceIdentity.address.addressLocality}`;
export const telHref = `tel:${practiceIdentity.phoneE164}`;
export const mailtoHref = `mailto:${practiceIdentity.email}`;
