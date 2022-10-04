export default value => {
  if (value !== null)
    return value.replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5');
}