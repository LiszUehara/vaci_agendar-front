import { fireEvent, screen } from "@testing-library/react"
import user from "@testing-library/user-event";
import Create from "./index"
import { customRender } from "../../utils/customRender";
import fetcher from '../../services/api'

jest.mock('../../services/api')
jest.mock('../../utils/env', () => ({VITE_BACKEND_URL: ''}))

describe('<Create />', () => {
  user.setup();
  it('all inputs on screen', async () => {
    ((fetcher.post as jest.Mock)).mockResolvedValueOnce(() => Promise.resolve('test1234'))
    customRender(<Create/>)
    const nameInput = screen.getByRole('textbox', { name: /Nome do Paciente/i });
    const birthDateInput = screen.getByRole('textbox', { name: /Data de Nascimento/i });
    const dateTimeInput = screen.getByRole('textbox', { name: /Horário do Agendamento/i });
    expect(nameInput);
    expect(birthDateInput);
    expect(dateTimeInput);
  })
  it('submitting', async () => {
    ((fetcher.post as jest.Mock)).mockResolvedValueOnce(() => Promise.resolve({}))
    customRender(<Create/>)
    const date = new Date('2023-12-12T10:00')
    const nameInput = screen.getByRole('textbox', { name: /Nome do Paciente/i });
    fireEvent.change(nameInput, { target: { value: 'Ana Maria' } });
    const birthDateInput = screen.getByRole('textbox', { name: /Data de Nascimento/i });
    fireEvent.change(birthDateInput, { target: { value: date } });
    const dateTimeInput = screen.getByRole('textbox', { name: /Horário do Agendamento/i });
    fireEvent.change(dateTimeInput, { target: { value: date } });
    const button = screen.getByRole('button', { name: /Cadastrar/i })
    //expect(button).toBeDisabled()

    fireEvent.click(button);
    //expect(screen.queryByText(/Carregando/i)).toBeNull()
    //expect(nameInput);
    expect(screen.getByDisplayValue('12/12/2023')).toBeInTheDocument();
    //expect(birthDateInput);
    //expect(dateTimeInput);
  })
})