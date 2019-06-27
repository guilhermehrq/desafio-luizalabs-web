import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const moneyMask = createNumberMask({
  prefix: 'R$ ',
  includeThousandsSeparator: false,
  allowDecimal: true,
  decimalSymbol: ',',
});

export const PipeCpf = (value) => {
  const cpfValue = value.padStart(11, '0');
  return cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const PipeDate = (date) => {
  const formattedDate = `${date.split('T')[0]}T03:00:00`;
  const dateObject = new Date(formattedDate);
  return dateObject.toLocaleDateString();
};

export const PipeMoney = (value) => {
  const splittedValue = value.toString().split('.');
  splittedValue[1] = splittedValue[1].padEnd(2, '0');

  return `R$ ${splittedValue[0]},${splittedValue[1]}`;
};
