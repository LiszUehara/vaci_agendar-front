import { fireEvent, screen } from "@testing-library/react"
import user from "@testing-library/user-event";
import Create from "./index"
import { customRender } from "../../utils/customRender";
import fetcher from '../../services/api'

jest.mock('../../services/api')
jest.mock('../../utils/env', () => ({VITE_BACKEND_URL: ''}))

//@ts-ignore
global.JSON = {
  parse: (_value: string)=> ({}),
  stringify: (_value: any)=> '',
};

describe('<Create />', () => {
  user.setup();
  it('Validate Inputs', async () => {
    customRender(<Create/>)
    const inputName = screen.getByRole('textbox', { name: /name/i });
    const inputCpf = screen.getByRole('textbox', { name: /cpf/i })
    const button = screen.getByRole('button', { name: /Cadastrar/i })

    fireEvent.change(inputName, { target: { value: 'John2 Smith' } });
    fireEvent.change(inputCpf, { target: { value: '01201201212' } });
    fireEvent.click(button);
    const errorInput = await screen.findByText(/Nome inválido, por favor tente novamente/i)
    const errorInputCpf = await screen.findByText(/CPF inválido/i)

    expect(errorInput).toBeInTheDocument();
    expect(errorInputCpf).toBeInTheDocument();
  })
  it('Submit with Success', async () => {
    fetcher.post = jest.fn().mockResolvedValue(() => Promise.resolve('success'))

    customRender(<Create/>)
    const date = new Date('2023-12-12T10:00')
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    fireEvent.change(nameInput, { target: { value: 'Ana Maria' } });
    const cpfInput = screen.getByRole('textbox', { name: /cpf/i });
    fireEvent.change(cpfInput, { target: { value: '95329471087' } });
    const birthDateInput = screen.getByRole('textbox', { name: /Data de Nascimento/i });
    fireEvent.change(birthDateInput, { target: { value: date } });
    const dateTimeInput = screen.getByRole('textbox', { name: /Horário do Agendamento/i });
    fireEvent.change(dateTimeInput, { target: { value: new Date() } });
    const button = screen.getByRole('button', { name: /Cadastrar/i })
    
    fireEvent.click(button);
    expect(await screen.findByText(/Agendamento realizado/i )).toBeInTheDocument();
  })
  it('Submit with Error', async () => {
    fetcher.post = jest.fn().mockResolvedValue({ cause: 'Error', error: true});

    customRender(<Create/>)
    const date = new Date('2023-12-12T10:00')
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    fireEvent.change(nameInput, { target: { value: 'Ana Maria' } });
    const cpfInput = screen.getByRole('textbox', { name: /cpf/i });
    fireEvent.change(cpfInput, { target: { value: '95329471087' } });
    const birthDateInput = screen.getByRole('textbox', { name: /Data de Nascimento/i });
    fireEvent.change(birthDateInput, { target: { value: date } });
    const dateTimeInput = screen.getByRole('textbox', { name: /Horário do Agendamento/i });
    fireEvent.change(dateTimeInput, { target: { value: new Date() } });
    const button = screen.getByRole('button', { name: /Cadastrar/i })
    
    fireEvent.click(button);
    expect(await screen.findByText(/Error/i )).toBeInTheDocument();
  })
})