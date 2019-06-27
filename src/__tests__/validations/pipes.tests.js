import { PipeCpf, PipeMoney, PipeDate } from '../../utils/masksAndPipes.utils';

describe('Testing Pipes', () => {
  it('should format a CPF number. (EX: 123.456.789-09)', () => {
    const formattedCPF = PipeCpf('12345678909');
    const formattedCPF2 = PipeCpf('1');

    expect(formattedCPF).toBe('123.456.789-09');
    expect(formattedCPF2).toBe('000.000.000-01');
  });

  it('should format a date and return in Locale', () => {
    const now = new Date().toISOString();

    const formattedDate = PipeDate(now);

    expect(formattedDate).toBe(new Date(now).toLocaleDateString());
  });

  it('should format a number in a money format', () => {
    const formattedMoney = PipeMoney(1552.53);
    const formattedMoney2 = PipeMoney(1552);

    expect(formattedMoney).toBe('R$ 1552,53');
    expect(formattedMoney2).toBe('R$ 1552,00');
  });
});
