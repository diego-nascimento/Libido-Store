export const normalize = (value: any) => {
  return value.replace(/[^0-9]/g, '');
}