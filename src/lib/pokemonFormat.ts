export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

export function formatAbilityName(ability: string): string {
  return ability.replace(/-/g, ' ');
}
