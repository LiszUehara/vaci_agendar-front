import { fireEvent, screen } from "@testing-library/react"
import user from "@testing-library/user-event";
import { ModalEdit} from "./index"
import { customRender } from "../../utils/customRender";
import fetcher from "../../services/api";

jest.mock('../../utils/env', () => ({VITE_BACKEND_URL: ''}))
jest.mock('../../services/api')

describe('<ModalEdit />', () => {
  user.setup();
  it('Validate Inputs ', async () => {
    customRender(
      <ModalEdit
        isOpen={true}
        onClose={()=> {}}
        item={{dateTime: new Date(), id: '1', patient: { birthDate: new Date(), cpf: '123.456.879-00', name: 'John', id: '1' }}}
      />)
      const inputName = screen.getByRole('textbox', { name: /name/i });
      const inputCpf = screen.getByRole('textbox', { name: /cpf/i })
      const button = screen.getByRole('button', { name: /Atualizar/i })
  
      fireEvent.change(inputName, { target: { value: 'John2 Smith' } });
      fireEvent.change(inputCpf, { target: { value: '01201201212' } });
      fireEvent.click(button);
      const errorInput = await screen.findByText(/Nome inválido, por favor tente novamente/i)
      const errorInputCpf = await screen.findByText(/CPF inválido/i)

    expect(errorInput).toBeInTheDocument();
    expect(errorInputCpf).toBeInTheDocument();
  })
  
  it('Submit Update', async () => {
    fetcher.put = jest.fn().mockResolvedValue(() => Promise.resolve('success'))
    customRender(
      <ModalEdit
        isOpen={true}
        onClose={()=> {}}
        item={{dateTime: new Date(), id: '1', patient: { birthDate: new Date(), cpf: '06125927318', name: 'John', id: '1' }, note: 'teste', status: 'unrealized'}}
      />)
      const button = screen.getByRole('button', { name: /Atualizar/i })
      fireEvent.click(button);
      
      expect(await screen.findByText(/Agendamento realizado/i )).toBeInTheDocument();
  })

  it('Error Update', async () => {
    fetcher.put = jest.fn().mockResolvedValue({ cause: 'Error', error: true})
    customRender(
      <ModalEdit
        isOpen={true}
        onClose={()=> {}}
        item={{dateTime: new Date(), id: '1', patient: { birthDate: new Date(), cpf: '06125927318', name: 'John', id: '1' }, note: 'teste', status: 'unrealized'}}
      />)
      const button = screen.getByRole('button', { name: /Atualizar/i })
      fireEvent.click(button);
      
      expect(await screen.findByText(/Error/i )).toBeInTheDocument();
  })
})