import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formattedDate = (date: number) => {
  return format(date, "dd 'de' MMMM 'de' yyyy '-' HH:mm'h'", {
    locale: ptBR,
  });
};
