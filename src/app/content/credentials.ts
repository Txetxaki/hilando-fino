/**
 * Marta's training, verbatim from the copy document she supplied (2026-07-31),
 * with orthographic typos corrected ("Psicologia" -> "Psicología", "infanto
 * juvenil" -> "infanto-juvenil"). No item is added, reworded or inferred: these
 * are professional credentials, so the list is exactly what she claims and
 * nothing more.
 */
export interface CredentialGroup {
  title: string;
  items: readonly string[];
}

export const credentialGroups: readonly CredentialGroup[] = [
  {
    title: 'Formación académica',
    items: ['Grado en Psicología', 'Máster en Psicología General Sanitaria', 'Máster en Formación del Profesorado (Orientación Educativa)']
  },
  {
    title: 'Especialización clínica',
    items: ['EMDR', 'Trauma y duelo infanto-juvenil', 'Trastornos de conducta', 'Mediación familiar']
  },
  {
    title: 'Formación en modelos psicoterapéuticos',
    items: ['Terapia cognitivo-conductual', 'Terapia Gestalt y Bioenergética', 'Círculo de Seguridad Parental']
  }
];

export const allCredentials: readonly string[] = credentialGroups.flatMap((group) => group.items);
